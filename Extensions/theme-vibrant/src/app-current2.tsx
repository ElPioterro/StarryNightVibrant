import { Vibrant } from "node-vibrant/browser";
import gsap from "gsap";

const REGULAR_DURATION_ANIMATION = 10;
const FIRST_DURATION_ANIMATION = 1.5;

// Reset LocalStorage
localStorage.removeItem("isFirstTime");

async function main() {
  while (!Spicetify?.showNotification) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Show message on start.
  // const user = await Spicetify.Platform.UserAPI.getUser();
  // Spicetify.showNotification(`Hello ` + user.displayName);

  initializeThemeExtension();
}

// Function to extract colors and apply gradient with morphing
function applyGradientFromCoverArt(): void {
  const coverArt = document.querySelector<HTMLImageElement>(
    ".main-nowPlayingWidget-coverArt img"
  );

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

        // Randomly select a key from the palette
        const paletteKeys = Object.keys(palette); // Get all palette keys (e.g., DarkMuted, Vibrant, etc.)
        // const randomKey =
        //   paletteKeys[Math.floor(Math.random() * paletteKeys.length)];
        const paletteKey = paletteKeys[0];

        // Randomly pick a color from the palette using the selected key
        const mainColor = "#000000";
        const secondaryColor = palette[paletteKey]?.hex || "#142b44"; // You can leave Vibrant fixed if desired

        console.log("Extracted colors:", mainColor, secondaryColor);

        // Morph the gradient using GSAP
        morphGradient(mainColor, secondaryColor);
      })
      .catch((error) => console.error("Error extracting colors:", error));
  } else {
    console.warn("Cover art not found or source is missing.");
  }
}

// Function to monitor the progress and update the gradient palette
function updateGradientOnProgress() {
  // Get the progress of the current song
  const progress = Spicetify.Player.getProgress(); // In seconds
  const duration = Spicetify.Player.getDuration(); // In seconds

  // Calculate the fraction of progress (0 to 1)
  if (progress && duration && duration > 0) {
    const progressFraction = progress / duration;
    const section = Math.floor(progressFraction * 2); // 0, 1, 2, 3, 4, 5

    if (section !== currentSection) {
      currentSection = section;
      console.warn("CHANGE SECTION!!!!");
      updatePaletteForSection(section);
    }
  }
}

// Global variable to track the current section
let currentSection = -1;

// Function to update the palette based on the section (1/6th of progress)
function updatePaletteForSection(section: number): void {
  const coverArt = document.querySelector<HTMLImageElement>(
    ".main-nowPlayingWidget-coverArt img"
  );

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

        const paletteKeys = Object.keys(palette); // Get all palette keys (e.g., DarkMuted, Vibrant, etc.)
        const paletteKey = paletteKeys[section % 2];

        // Randomly pick a color from the palette using the selected key
        const mainColor = "#000000";
        const secondaryColor = palette[paletteKey]?.hex || "#142b44"; // You can leave Vibrant fixed if desired

        console.log(
          `Section ${section + 1}: Extracted colors`,
          mainColor,
          secondaryColor
        );

        // Morph the gradient using GSAP
        morphGradient(mainColor, secondaryColor);
      })
      .catch((error) => console.error("Error extracting colors:", error));
  } else {
    console.warn("Cover art not found or source is missing.");
  }
}

// Helper function to morph the gradient using GSAP
function morphGradient(newMain: string, newSecondary: string): void {
  const root = document.documentElement;

  // Get the current colors
  const currentMain =
    getComputedStyle(root).getPropertyValue("--gradient-main").trim() ||
    "#000000";
  const currentSecondary =
    getComputedStyle(root).getPropertyValue("--gradient-secondary").trim() ||
    "#142b44";

  if (newMain == currentMain && newSecondary == currentSecondary) return;

  // Use GSAP to animate the CSS variables
  gsap.to(root, {
    "--gradient-main": newMain,
    "--gradient-secondary": newSecondary,
    duration: getAnimationDuration(),
    ease: "power2.inOut",
    onUpdate: () => {
      console.log("Gradient is morphing...");
    },
    onComplete: () => {
      console.log("Gradient morph completed.");
    },
  });
}
// Function to get the animation duration
function getAnimationDuration(): number {
  const isFirstTime = localStorage.getItem("isFirstTime");

  if (!isFirstTime) {
    localStorage.setItem("isFirstTime", "false");
    return FIRST_DURATION_ANIMATION; // Fast animation duration for the first time
  }

  return REGULAR_DURATION_ANIMATION;
}

// Utility function to convert Spotify URI to proxy URL
function getProxyImageUrl(spotifyUri: string): string {
  return spotifyUri.replace("spotify:image:", "https://i.scdn.co/image/");
}

// Main logic
function initializeThemeExtension(): void {
  const nowPlayingBar = document.querySelector<HTMLElement>(
    ".main-nowPlayingWidget-trackInfo"
    // ".Root__now-playing-bar"
  );
  if (!nowPlayingBar) {
    console.error("Now-playing bar not found.");
    return;
  }

  console.log("Now-playing bar found:", nowPlayingBar);

  // Observe changes in the now-playing bar
  const observer = new MutationObserver(() => {
    console.log("Now-playing bar content changed");
    applyGradientFromCoverArt();
  });

  observer.observe(nowPlayingBar, { childList: true, subtree: true });

  // Start progress tracking
  setInterval(updateGradientOnProgress, 1000); // Update every second

  // Initial gradient application
  applyGradientFromCoverArt();
}

export default main;
