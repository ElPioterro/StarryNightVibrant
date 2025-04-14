import { Vibrant } from "node-vibrant/browser";
import gsap from "gsap";

async function main() {
  while (!Spicetify?.showNotification) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Show message on start.
  const user = await Spicetify.Platform.UserAPI.getUser();
  Spicetify.showNotification(`Hello ` + user.displayName);

  initializeThemeExtension();
}

// Function to extract colors and apply gradient with morphing
function applyGradientFromCoverArt(): void {
  const coverArt = document.querySelector<HTMLImageElement>(
    ".main-nowPlayingWidget-coverArt img"
  );

  if (coverArt && coverArt.src) {
    const proxyUrl = getProxyImageUrl(coverArt.src);
    console.log("Using proxy URL for cover art:", proxyUrl);

    Vibrant.from(proxyUrl)
      .getPalette()
      .then((palette) => {
        if (!palette) {
          console.error("Palette extraction failed");
          return;
        }

        // const mainColor = palette.DarkMuted?.hex || "#000000";
        const mainColor = "#000000";
        // const secondaryColor = palette.Vibrant?.hex || "#142b44";
        const secondaryColor = "#142b44";

        console.log("Extracted colors:", mainColor, secondaryColor);

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
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: () => {
      console.log("Gradient is morphing...");
    },
    onComplete: () => {
      console.log("Gradient morph completed.");
    },
  });
}

// Utility function to convert Spotify URI to proxy URL
function getProxyImageUrl(spotifyUri: string): string {
  return spotifyUri.replace("spotify:image:", "https://i.scdn.co/image/");
}

// Main logic
function initializeThemeExtension(): void {
  const nowPlayingBar = document.querySelector<HTMLElement>(
    // ".Root__now-playing-bar"
    ".main-nowPlayingWidget-trackInfo"
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

  // Initial gradient application
  applyGradientFromCoverArt();
}

export default main;
