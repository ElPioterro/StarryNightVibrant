import { Vibrant } from "node-vibrant/browser";
import gsap from "gsap";

// Constants
const SECTION_COUNT = 2; // Recommended setting: 5
const REGULAR_DURATION_ANIMATION = 10;
const FIRST_DURATION_ANIMATION = 1.5;
const NOW_PLAYING_BAR_SELECTOR = ".main-nowPlayingWidget-trackInfo"; // ".Root__now-playing-bar"
const COVER_ART_SELECTOR = ".main-nowPlayingWidget-coverArt img";

// Reset LocalStorage
localStorage.removeItem("isFirstTime");

// Variables
let currentSection = -1;

// Main function
async function main() {
  while (!Spicetify?.showNotification) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const user = await Spicetify.Platform.UserAPI.getUser();
  Spicetify.showNotification(`Hello ${user.displayName}`);
  initializeThemeExtension();
}

// Function to initialize the theme extension
function initializeThemeExtension(): void {
  const nowPlayingBar = document.querySelector<HTMLElement>(
    NOW_PLAYING_BAR_SELECTOR
  );
  if (!nowPlayingBar) {
    console.error("Now-playing bar not found.");
    return;
  }

  observeAndAnimate();
}

// Async function to observe changes and animate gradients
async function observeAndAnimate() {
  const observer = new MutationObserver(() => applyGradientFromCoverArt());
  const nowPlayingBar = document.querySelector<HTMLElement>(
    NOW_PLAYING_BAR_SELECTOR
  );

  if (nowPlayingBar) {
    observer.observe(nowPlayingBar, { childList: true, subtree: true });
  }

  while (true) {
    const progress = Spicetify.Player.getProgress(); // In seconds
    const duration = Spicetify.Player.getDuration(); // In seconds

    if (progress && duration && duration > 0) {
      const progressFraction = progress / duration;
      const section = Math.floor(progressFraction * SECTION_COUNT);

      if (section !== currentSection) {
        currentSection = section;
        console.warn("CHANGE SECTION!!!!");
        updatePaletteForSection(section);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

// Function to extract colors and apply gradient with morphing
function applyGradientFromCoverArt(): void {
  const coverArt = document.querySelector<HTMLImageElement>(COVER_ART_SELECTOR);

  if (coverArt && coverArt.src) {
    const proxyUrl = getProxyImageUrl(coverArt.src);

    Vibrant.from(proxyUrl)
      .getPalette()
      .then((palette) => {
        if (!palette) {
          console.error("Palette extraction failed");
          return;
        }

        const paletteKeys = Object.keys(palette).slice(0, SECTION_COUNT - 1);
        const paletteKey = paletteKeys[0];

        const mainColor = "#000000";
        const secondaryColor = palette[paletteKey]?.hex || "#142b44"; // Default if undefined

        console.log("Extracted colors:", mainColor, secondaryColor);
        morphGradient(mainColor, secondaryColor);
      })
      .catch((error) => console.error("Error extracting colors:", error));
  } else {
    console.warn("Cover art not found or source is missing.");
  }
}

// Function to update the palette based on the section
function updatePaletteForSection(section: number): void {
  const coverArt = document.querySelector<HTMLImageElement>(COVER_ART_SELECTOR);

  if (coverArt && coverArt.src) {
    const proxyUrl = getProxyImageUrl(coverArt.src);

    Vibrant.from(proxyUrl)
      .getPalette()
      .then((palette) => {
        if (!palette) {
          console.error("Palette extraction failed");
          return;
        }

        const maxPaletteSize = 6;

        const paletteKeys = Object.keys(palette).slice(0, SECTION_COUNT);
        const paletteKey = paletteKeys[section % maxPaletteSize];

        const mainColor = "#000000";
        const secondaryColor = palette[paletteKey]?.hex || "#142b44"; // Default if undefined

        console.log(
          `Section ${section + 1}/${SECTION_COUNT}: Extracted colors`,
          mainColor,
          secondaryColor
        );
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

  const currentMain =
    getComputedStyle(root).getPropertyValue("--gradient-main").trim() ||
    "#000000";
  const currentSecondary =
    getComputedStyle(root).getPropertyValue("--gradient-secondary").trim() ||
    "#142b44";

  if (newMain === currentMain && newSecondary === currentSecondary) return;

  gsap.to(root, {
    "--gradient-main": newMain,
    "--gradient-secondary": newSecondary,
    duration: getAnimationDuration(),
    ease: "power2.inOut",
    onStart: () => {
      console.log("Gradient started morphing.");
    },
    // onUpdate: () => {
    //   console.log("Gradient is morphing...");
    // },
    onComplete: () => {
      console.log("Gradient morph completed.");
    },
  });
}

// Utility function to convert Spotify URI to proxy URL
function getProxyImageUrl(spotifyUri: string): string {
  return spotifyUri.replace("spotify:image:", "https://i.scdn.co/image/");
}

// Function to get the animation duration
function getAnimationDuration(): number {
  const isFirstTime = localStorage.getItem("isFirstTime");

  if (!isFirstTime) {
    localStorage.setItem("isFirstTime", "false");
    return FIRST_DURATION_ANIMATION; // Fast animation duration for the first time
  }

  const sectionDuration = Spicetify.Player.getDuration() / 1000 / SECTION_COUNT;

  return Math.min(REGULAR_DURATION_ANIMATION, sectionDuration);
}

export default main;
