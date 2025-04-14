import { Vibrant } from "node-vibrant/browser";
import gsap from "gsap";

const colorful_background = require("./helper/colorful-background-css-generator.js");

console.log(colorful_background);
// import ColorfulBackgroundLayer
// Main function to initialize and show notifications
async function main() {
  while (!Spicetify?.showNotification) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Show message on start.
  const user = await Spicetify.Platform.UserAPI.getUser();
  Spicetify.showNotification(`Hello ` + user.displayName);

  initializeThemeExtension();
}

// Function to extract colors and apply a gradient with multiple layers
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

        // Extract all colors from the palette
        const layers: ColorfulBackgroundLayer[] = [];

        Object.keys(palette).forEach((key) => {
          const color = palette[key as keyof typeof palette];
          if (color && color.hex) {
            const layer = generateGradientLayer(color.hex);
            layers.push(layer);
          }
        });

        // Apply the dynamic gradient with the layers
        generateDynamicGradient(layers);
      })
      .catch((error) => console.error("Error extracting colors:", error));
  } else {
    console.warn("Cover art not found or source is missing.");
  }
}

// Function to generate a gradient layer based on a color
function generateGradientLayer(hex: string): ColorfulBackgroundLayer {
  const hsl = hexToHSL(hex); // Convert hex to HSL
  return new ColorfulBackgroundLayer({
    degree: Math.random() * 360, // Random degree for variation
    h: hsl.h,
    s: hsl.s,
    l: hsl.l,
    posColor: Math.random() * 100, // Random color position
    posTransparency: Math.random() * 100, // Random transparency
  });
}

// Helper function to convert hex color to HSL
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const h = (max + min) / 2;
  const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * h - 1) - 1);
  const l = (max + min) / 2;

  return { h, s, l };
}

// Function to generate and animate a dynamic gradient from multiple layers
function generateDynamicGradient(layers: ColorfulBackgroundLayer[]): void {
  const body = document.body;

  // Create and apply the gradient layers
  const gradient = new ColorfulBackgroundGenerator();

  layers.forEach((layer) => {
    gradient.addLayer(layer);
  });

  // Assign the generated style to the body
  gradient.assignStyleToElementId("gradient-background");

  // Optionally animate the background change using GSAP
  gsap.to(body, {
    background: `linear-gradient(to right, ${layers
      .map((layer) => layer.toCSS())
      .join(", ")})`,
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

// Helper function to convert a gradient layer to CSS format
function generateCSS(layer: ColorfulBackgroundLayer): string {
  return `hsla(${layer.h}, ${layer.s * 100}%, ${layer.l * 100}%, ${
    layer.posTransparency / 100
  }) ${layer.posColor}%`;
}

// Utility function to convert Spotify URI to proxy URL
function getProxyImageUrl(spotifyUri: string): string {
  return spotifyUri.replace("spotify:image:", "https://i.scdn.co/image/");
}

// Initialize the theme extension and observe changes
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

// Call the main function to start the extension
export default main;
