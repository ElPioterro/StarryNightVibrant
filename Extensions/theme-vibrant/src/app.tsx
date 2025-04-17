import { Vibrant } from "node-vibrant/browser";
import gsap from "gsap";
import { SettingsSection } from "spcr-settings";
import chroma from "chroma-js";

// --- Constants ---
// Settings IDs
const SETTINGS_SECTION_ID = "gradient-theme-settings";
const MODE_SETTING_ID = "gradient-mode";
const SECTIONS_SETTING_ID = "gradient-sections";
const ANIMATION_TYPE_SETTING_ID = "gradient-anim-type";
const FIXED_DURATION_SETTING_ID = "gradient-anim-fixed-duration";
const REGULAR_DURATION_SETTING_ID = "gradient-anim-regular-duration";
const FIRST_DURATION_SETTING_ID = "gradient-anim-first-duration";
const FIRST_TIME_STORAGE_KEY = "gradientThemeFirstTime";

// Selectors
const NOW_PLAYING_BAR_SELECTOR = ".main-nowPlayingWidget-trackInfo";
const COVER_ART_SELECTOR = ".main-nowPlayingWidget-coverArt img";

// Default Values
const DEFAULT_MODE = "Progress-Based"; // Options: "Static", "Random Static", "Progress-Based"
const DEFAULT_SECTIONS = 6;
const DEFAULT_ANIMATION_TYPE = "Fixed"; // Options: "Fixed", "Dynamic", "Dynamic Adjusted"
const DEFAULT_FIXED_DURATION = 1.5;
const DEFAULT_REGULAR_DURATION = 1.5;
const DEFAULT_FIRST_DURATION = 1.5;
const DEFAULT_SECONDARY_COLOR = "#142b44"; // Fallback color
const DEFAULT_DYNAMIC_CARD_BG = "rgba(255, 255, 255, 0.1)"; // Default fallback hover bg
const DEFAULT_DYNAMIC_TRACK_BG = "rgba(255, 255, 255, 0.08)"; // Default fallback track hover bg
const DEFAULT_DYNAMIC_LISTROW_AFTER_BG = "rgba(255, 255, 255, 0.06)"; // Default fallback for list row ::after hover

// --- Global State ---
let currentSection = -1;
let settings: SettingsSection;
let progressIntervalId: number | null = null;

// --- Main Initialization ---
async function main() {
  while (
    !Spicetify?.Platform ||
    !Spicetify?.showNotification ||
    !Spicetify?.Player
  ) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // --- Initialize CSS Variable ---
  // Set the initial fallback value for the card hover background
  document.documentElement.style.setProperty(
    "--dynamic-card-hover-bg",
    DEFAULT_DYNAMIC_CARD_BG
  );
  document.documentElement.style.setProperty(
    "--dynamic-track-hover-bg",
    DEFAULT_DYNAMIC_TRACK_BG
  );
  document.documentElement.style.setProperty(
    "--dynamic-listRow-after-hover-bg",
    DEFAULT_DYNAMIC_LISTROW_AFTER_BG
  ); // <--- ADD THIS

  // Initialize Settings
  initializeSettings();

  // Reset the "first time" flag on each load/reload
  localStorage.removeItem(FIRST_TIME_STORAGE_KEY);

  // Show message on start.
  try {
    const user = await Spicetify.Platform.UserAPI.getUser();
    Spicetify.showNotification(
      `Gradient Theme Initialized for ${user.displayName}`
    );
  } catch (e) {
    console.warn("Couldn't fetch user info for notification", e);
    Spicetify.showNotification(`Gradient Theme Initialized`);
  }

  initializeThemeExtension();
}

// --- Settings Initialization ---
function initializeSettings(): void {
  settings = new SettingsSection(
    "Gradient Theme Settings",
    SETTINGS_SECTION_ID
  );

  settings.addDropDown(
    MODE_SETTING_ID,
    "Gradient Update Mode",
    ["Static", "Random Static", "Progress-Based"],
    ["Static", "Random Static", "Progress-Based"].indexOf(DEFAULT_MODE), // Default index
    () => {
      const newValue = settings.getFieldValue(MODE_SETTING_ID) as string;
      console.log("Mode changed to:", newValue);
      resetThemeLogic(); // Restart logic when mode changes
    }
  );

  settings.addInput(
    SECTIONS_SETTING_ID,
    "Number of Sections (for Progress-Based mode)",
    DEFAULT_SECTIONS.toString(),
    () => {
      const newValue = settings.getFieldValue(SECTIONS_SETTING_ID) as string;
      console.log("Sections changed to:", newValue);
      // Reset section tracking immediately if mode is Progress-Based
      const currentMode = settings.getFieldValue(MODE_SETTING_ID) as string;
      if (currentMode === "Progress-Based") {
        currentSection = -1; // Reset section tracking for the new count
        // Optional: Trigger an immediate update based on the new section count?
        // updateGradientOnProgress(); // This might be too aggressive, let the interval handle it.
      }
    }
  );

  settings.addDropDown(
    ANIMATION_TYPE_SETTING_ID,
    "Animation Duration Type",
    ["Fixed", "Dynamic", "Dynamic Adjusted"],
    ["Fixed", "Dynamic", "Dynamic Adjusted"].indexOf(DEFAULT_ANIMATION_TYPE),
    // CORRECTED: Callback takes no arguments. Get value inside.
    () => {
      const newValue = settings.getFieldValue(
        ANIMATION_TYPE_SETTING_ID
      ) as string;
      console.log("Animation type changed:", newValue);
      // No specific reset needed here, getAnimationDuration reads it live
    }
  );

  // Inputs for durations usually don't need immediate onChange logic,
  // as their values are read when needed (e.g., in getAnimationDuration).
  // If you *did* need an onChange, it would follow the same pattern: () => { const val = settings.getFieldValue(...) }
  settings.addInput(
    FIXED_DURATION_SETTING_ID,
    "Fixed Animation Duration (seconds)",
    DEFAULT_FIXED_DURATION.toString()
  );

  settings.addInput(
    REGULAR_DURATION_SETTING_ID,
    "Regular Animation Duration (seconds, for Dynamic modes)",
    DEFAULT_REGULAR_DURATION.toString()
  );

  settings.addInput(
    FIRST_DURATION_SETTING_ID,
    "First Animation Duration (seconds, for Dynamic modes)",
    DEFAULT_FIRST_DURATION.toString()
  );

  settings.pushSettings();
}

// --- Core Theme Logic ---

// Function to initialize the theme extension logic based on current settings
function initializeThemeExtension(): void {
  console.log("Initializing theme extension...");
  const nowPlayingBar = document.querySelector<HTMLElement>(
    NOW_PLAYING_BAR_SELECTOR
  );
  if (!nowPlayingBar) {
    console.error("Now-playing bar not found. Cannot initialize theme.");
    return;
  }
  console.log("Now-playing bar found:", nowPlayingBar);

  // --- Observer Setup ---
  const observer = new MutationObserver((mutations) => {
    // We only care if the content *actually* changed, not just any mutation
    // A simple check might be if the cover art source changed, but observing trackInfo is broader
    console.log("Now-playing bar content changed (Mutation Observer)");
    // Reset section tracking on song change IF in progress mode
    if (settings.getFieldValue(MODE_SETTING_ID) === "Progress-Based") {
      currentSection = -1;
    }
    // Apply the initial/static gradient based on the new song
    applyGradientFromCoverArt(true); // Pass true to indicate it's an initial application for the song
  });

  observer.observe(nowPlayingBar, {
    childList: true,
    subtree: true,
    characterData: true,
  }); // Observe text changes too

  // --- Progress Tracking Setup ---
  setupProgressTracking();

  // --- Initial Gradient Application ---
  // Apply gradient immediately on load based on whatever is playing
  applyGradientFromCoverArt(true); // Initial load
}

// Function to start or stop the progress tracking interval
function setupProgressTracking(): void {
  // Clear existing interval if any
  if (progressIntervalId !== null) {
    clearInterval(progressIntervalId);
    progressIntervalId = null;
    console.log("Cleared existing progress interval.");
  }

  // Start interval only if mode is Progress-Based
  const currentMode = settings.getFieldValue(MODE_SETTING_ID) as string;
  if (currentMode === "Progress-Based") {
    console.log("Starting progress tracking interval.");
    progressIntervalId = window.setInterval(updateGradientOnProgress, 1000); // Check progress every second
  } else {
    console.log("Mode is not Progress-Based, progress tracking stopped.");
  }
}

// Reset logic (e.g., when settings change)
function resetThemeLogic(): void {
  console.log("Resetting theme logic due to settings change...");
  // Re-setup progress tracking based on new mode
  setupProgressTracking();
  // Re-apply gradient based on current song and new settings
  applyGradientFromCoverArt(true); // Treat as initial application for the current song with new settings
}

// Function to extract colors and apply gradient based on mode
function applyGradientFromCoverArt(isInitialApplication = false): void {
  const coverArt = document.querySelector<HTMLImageElement>(COVER_ART_SELECTOR);
  const currentMode = settings.getFieldValue(MODE_SETTING_ID) as string;

  // Don't re-apply static/random static unless it's the initial call for a song change
  if (
    !isInitialApplication &&
    (currentMode === "Static" || currentMode === "Random Static")
  ) {
    // console.log("Skipping gradient update for Static/Random mode (not initial application).");
    return;
  }

  if (coverArt && coverArt.src) {
    const proxyUrl = getProxyImageUrl(coverArt.src);
    // console.log("Using proxy URL for cover art:", proxyUrl);

    Vibrant.from(proxyUrl)
      .getPalette()
      .then((palette) => {
        if (!palette) {
          console.error("Palette extraction failed");
          return;
        }

        const paletteKeys = Object.keys(palette).filter((key) => palette[key]); // Filter out null/undefined swatches

        if (paletteKeys.length === 0) {
          console.error("No valid palette keys found.");
          morphGradient(
            "#000000",
            DEFAULT_SECONDARY_COLOR,
            isInitialApplication
          ); // Apply default on failure
          return;
        }

        let mainColor = "#000000"; // Keep main color black as per examples
        let secondaryColor = DEFAULT_SECONDARY_COLOR;
        let logReason = "";

        switch (currentMode) {
          case "Static":
            // Use the first available key (often Vibrant or Muted)
            secondaryColor =
              palette[paletteKeys[0]]?.hex || DEFAULT_SECONDARY_COLOR;
            logReason = "Static mode - First Key";
            break;
          case "Random Static":
            const randomKey =
              paletteKeys[Math.floor(Math.random() * paletteKeys.length)];
            secondaryColor = palette[randomKey]?.hex || DEFAULT_SECONDARY_COLOR;
            logReason = `Random Static mode - Key: ${randomKey}`;
            break;
          case "Progress-Based":
            // In progress mode, this function is mainly for the *initial* application (section 0)
            // or if called directly after a song change. updateGradientOnProgress handles subsequent sections.
            const numSections =
              parseInt(
                settings.getFieldValue(SECTIONS_SETTING_ID) as string,
                10
              ) || DEFAULT_SECTIONS;
            const sectionIndex = 0; // Always use the first color for initial application in progress mode
            const paletteKeyProgress =
              paletteKeys[sectionIndex % paletteKeys.length]; // Cycle through available keys
            secondaryColor =
              palette[paletteKeyProgress]?.hex || DEFAULT_SECONDARY_COLOR;
            logReason = `Progress-Based mode - Initial Apply (Section 0) - Key: ${paletteKeyProgress}`;
            // If it's *not* the initial application but somehow this got called in progress mode,
            // we might fall back to the logic in updateGradientOnProgress - however, that function
            // should be the primary driver for progress updates.
            break;
        }

        console.log(
          `${logReason} -> Extracted colors:`,
          mainColor,
          secondaryColor
        );
        morphGradient(mainColor, secondaryColor, isInitialApplication);
      })
      .catch((error) => {
        console.error("Error extracting colors:", error);
        morphGradient("#000000", DEFAULT_SECONDARY_COLOR, isInitialApplication); // Apply default on error
      });
  } else {
    console.warn(
      "Cover art not found or source is missing. Cannot apply gradient."
    );
    // Optionally apply a default gradient if no cover art is found
    // morphGradient("#000000", DEFAULT_SECONDARY_COLOR, isInitialApplication);
  }
}

// Function to monitor the progress and update the gradient palette (only for Progress-Based mode)
function updateGradientOnProgress() {
  // First, check if we are *supposed* to be running (i.e., mode is Progress-Based)
  const currentMode = settings.getFieldValue(MODE_SETTING_ID) as string;
  if (currentMode !== "Progress-Based") {
    // If the mode is wrong, simply return.
    // setupProgressTracking is responsible for clearing the interval when the mode changes.
    // We might log this occurrence if the interval wasn't cleared instantly, but don't clear it here.
    // console.warn("updateGradientOnProgress called when mode is not Progress-Based. Interval should have been cleared.");
    return;
  }

  const progress = Spicetify.Player.getProgress(); // Milliseconds for newer Spicetify? Check API. Assuming ms.
  const duration = Spicetify.Player.getDuration(); // Milliseconds for newer Spicetify? Check API. Assuming ms.

  if (progress != null && duration != null && duration > 0) {
    const progressFraction = progress / duration;
    const numSections =
      parseInt(settings.getFieldValue(SECTIONS_SETTING_ID) as string, 10) ||
      DEFAULT_SECTIONS;
    const section = Math.min(
      Math.floor(progressFraction * numSections),
      numSections - 1
    ); // Clamp section to max index

    if (section !== currentSection) {
      console.warn(`CHANGE SECTION: ${currentSection} -> ${section}`);
      currentSection = section;
      updatePaletteForSection(section);
    }
  }
}

// Function to update the palette based on the calculated section
function updatePaletteForSection(section: number): void {
  const coverArt = document.querySelector<HTMLImageElement>(COVER_ART_SELECTOR);

  if (coverArt && coverArt.src) {
    const proxyUrl = getProxyImageUrl(coverArt.src);

    Vibrant.from(proxyUrl)
      .getPalette()
      .then((palette) => {
        if (!palette) {
          console.error(`Section ${section + 1}: Palette extraction failed`);
          return;
        }

        const paletteKeys = Object.keys(palette).filter((key) => palette[key]); // Filter out null/undefined swatches
        if (paletteKeys.length === 0) {
          console.error(`Section ${section + 1}: No valid palette keys found.`);
          return;
        }

        const numSections =
          parseInt(settings.getFieldValue(SECTIONS_SETTING_ID) as string, 10) ||
          DEFAULT_SECTIONS;
        const paletteKey = paletteKeys[section % paletteKeys.length]; // Cycle through available keys based on section

        const mainColor = "#000000";
        const secondaryColor =
          palette[paletteKey]?.hex || DEFAULT_SECONDARY_COLOR;

        console.log(
          `Section ${
            section + 1
          }/${numSections}: Extracted colors (Key: ${paletteKey})`,
          mainColor,
          secondaryColor
        );
        morphGradient(mainColor, secondaryColor, false); // Not an initial application
      })
      .catch((error) =>
        console.error(`Section ${section + 1}: Error extracting colors:`, error)
      );
  } else {
    console.warn(
      `Section ${section + 1}: Cover art not found or source is missing.`
    );
  }
}

// --- Helper Functions ---

// Helper function to morph the gradient using GSAP
function morphGradient(
  newMain: string,
  newSecondary: string,
  isInitialApplication: boolean
): void {
  const root = document.documentElement;
  const currentMain =
    getComputedStyle(root).getPropertyValue("--gradient-main").trim() ||
    "#000000";
  const currentSecondary =
    getComputedStyle(root).getPropertyValue("--gradient-secondary").trim() ||
    DEFAULT_SECONDARY_COLOR;

  // Avoid unnecessary animations if colors haven't changed
  if (newMain === currentMain && newSecondary === currentSecondary) {
    // console.log("Skipping morph: Colors are the same.");
    return;
  }

  //  Calculate and set dynamic card hover background ---
  try {
    // Card hover background: Darken the secondary color significantly
    // Experiment with the darken value (e.g., 1, 1.5, 2). Let's start with 1.2
    const cardHoverBgColor = chroma(newSecondary).darken(1.2).hex("rgba"); // Keep it opaque for now
    root.style.setProperty("--dynamic-card-hover-bg", cardHoverBgColor);
    // console.log(`Set --dynamic-card-hover-bg to ${cardHoverBgColor}`);

    // Track row hover background: Darken slightly less than cards
    // Experiment with the darken value (e.g., 0.5, 0.8, 1). Let's start with 0.8
    const trackHoverBgColor = chroma(newSecondary).darken(0.8).hex("rgba"); // Keep it opaque
    root.style.setProperty("--dynamic-track-hover-bg", trackHoverBgColor);
    // console.log(`Set --dynamic-track-hover-bg to ${trackHoverBgColor}`);

    // List row ::after hover background: Darken subtly
    // Experiment with darken value (e.g., 0.4, 0.5, 0.6). Let's try 0.5
    const listRowAfterHoverBgColor = chroma(newSecondary)
      .darken(0.5)
      .hex("rgba");
    root.style.setProperty(
      "--dynamic-listRow-after-hover-bg",
      listRowAfterHoverBgColor
    );
    // console.log(`Set --dynamic-listRow-after-hover-bg to ${listRowAfterHoverBgColor}`);
  } catch (error) {
    console.error("Error setting dynamic card hover color:", error);
    // Fallback to default if color parsing/setting fails
    root.style.setProperty("--dynamic-card-hover-bg", DEFAULT_DYNAMIC_CARD_BG);
    root.style.setProperty(
      "--dynamic-track-hover-bg",
      DEFAULT_DYNAMIC_TRACK_BG
    );
    root.style.setProperty(
      "--dynamic-listRow-after-hover-bg",
      DEFAULT_DYNAMIC_LISTROW_AFTER_BG
    );
  }

  const duration = getAnimationDuration(isInitialApplication);
  console.log(`Morphing gradient to ${newSecondary} over ${duration}s`);

  gsap.to(root, {
    "--gradient-main": newMain,
    "--gradient-secondary": newSecondary,
    duration: duration,
    ease: "power2.inOut",
    // onStart: () => { console.log("Gradient morph started."); },
    // onUpdate: () => { console.log("Gradient is morphing..."); },
    onComplete: () => {
      console.log("Gradient morph completed.");
    },
  });
}

// Function to get the appropriate animation duration based on settings
function getAnimationDuration(isInitialApplication: boolean): number {
  const animType = settings.getFieldValue(ANIMATION_TYPE_SETTING_ID) as string;
  const fixedDuration =
    parseFloat(settings.getFieldValue(FIXED_DURATION_SETTING_ID) as string) ||
    DEFAULT_FIXED_DURATION;
  const regularDuration =
    parseFloat(settings.getFieldValue(REGULAR_DURATION_SETTING_ID) as string) ||
    DEFAULT_REGULAR_DURATION;
  const firstDuration =
    parseFloat(settings.getFieldValue(FIRST_DURATION_SETTING_ID) as string) ||
    DEFAULT_FIRST_DURATION;

  switch (animType) {
    case "Fixed":
      return fixedDuration;

    case "Dynamic":
    case "Dynamic Adjusted":
      const isFirstTime = localStorage.getItem(FIRST_TIME_STORAGE_KEY) === null;
      let duration: number;

      if (isFirstTime && isInitialApplication) {
        localStorage.setItem(FIRST_TIME_STORAGE_KEY, "false");
        duration = firstDuration;
        console.log("Using FIRST animation duration:", duration);
      } else {
        duration = regularDuration;
        console.log("Using REGULAR animation duration:", duration);
      }

      // Adjust if necessary
      if (animType === "Dynamic Adjusted") {
        const currentMode = settings.getFieldValue(MODE_SETTING_ID) as string;
        if (currentMode === "Progress-Based") {
          const songDurationMs = Spicetify.Player.getDuration();
          const numSections =
            parseInt(
              settings.getFieldValue(SECTIONS_SETTING_ID) as string,
              10
            ) || DEFAULT_SECTIONS;
          if (songDurationMs && numSections > 0) {
            const sectionDurationSec = songDurationMs / 1000 / numSections;
            if (sectionDurationSec > 0) {
              // Ensure positive duration
              const adjustedDuration = Math.min(
                duration,
                sectionDurationSec * 0.9
              ); // Use 90% of section duration to ensure completion before next change
              console.log(
                `Dynamic Adjusted: Regular=${duration}, Section=${sectionDurationSec.toFixed(
                  2
                )}, Adjusted=${adjustedDuration.toFixed(2)}`
              );
              return adjustedDuration;
            }
          }
        }
      }
      return duration; // Return unadjusted duration for "Dynamic" or if adjustment failed

    default:
      return DEFAULT_FIXED_DURATION; // Fallback
  }
}

// Utility function to convert Spotify URI to proxy URL
function getProxyImageUrl(spotifyUri: string): string {
  // Handle both "spotify:image:" and direct "https://i.scdn.co/image/" URLs
  if (spotifyUri.startsWith("spotify:image:")) {
    return spotifyUri.replace("spotify:image:", "https://i.scdn.co/image/");
  }
  // If it's already an i.scdn.co URL, just return it
  if (spotifyUri.startsWith("https://i.scdn.co/image/")) {
    return spotifyUri;
  }
  // Log a warning if it's an unexpected format
  console.warn("Unexpected image URI format:", spotifyUri);
  return spotifyUri; // Return as is, might fail in Vibrant.from
}

export default main;
