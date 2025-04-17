# Spicetify Project - Dynamic Gradient Theme

A modified custom Spicetify theme and extension that dynamically changes the background gradient based on the currently playing song's cover art. It offers several modes for how the gradient updates and animates.

Based on the StarryNight theme concept.

## Features

- **Dynamic Background:** Extracts colors from the current song's cover art to create a smooth background gradient.
- **Multiple Modes:**
  - **Static:** Sets one gradient per song using the primary color.
  - **Random Static:** Sets one gradient per song using a random color from the palette.
  - **Progress-Based:** Cycles through multiple colors from the palette as the song progresses.
- **Configurable Animation:** Choose between fixed or dynamic animation durations, with options for faster initial transitions.
- **Settings Menu:** Easily configure modes, sections (for Progress-Based), and animation timings via the Spicetify settings menu.

## Note

This extension is designed to work primarily with the accompanying `MyTheme` theme files, which define the necessary CSS variables (`--gradient-main`, `--gradient-secondary`). Using it with other themes might require manual CSS adjustments in those themes.

## Tested Environment

This extension and theme were tested on:

- **Spotify:** Spotify for Windows (64 bit) - `1.2.14.1149.ga3ae422d`
- **Spicetify:** `v2.39.6`

_(Compatibility with other versions/platforms may vary.)_

## Installation

1.  **Clone/Download:** Get the project files.
2.  **Copy Theme:** Place the `MyTheme` folder into your Spicetify `Themes` directory.
    - _Find your Spicetify directories by running `spicetify -c`._
3.  **Copy Extension:** Place the final `app.js` (or `extension.js` if you renamed the build output) from the `Extensions` (or your build output) folder into your Spicetify `Extensions` directory.
4.  **Apply:** Run the following commands in your terminal:
    ```bash
    spicetify config current_theme MyTheme color_scheme base
    spicetify config extensions app.js # Or the name you used for the build output
    spicetify backup apply
    ```
    _(Using `backup apply` is recommended to ensure Spotify restarts correctly)._

## Configuration

After installation, go to the Spicetify settings menu (Your Profile Picture -> Settings) to find the "Gradient Theme Settings" section and customize the behavior.

## Development

If you want to modify the extension (written in TypeScript):

1.  Ensure you have Node.js and yarn (or npm) installed.
2.  Install Spicetify Creator: `npm i -g spicetify-creator`
3.  Navigate to the project directory in your terminal.
4.  Install dependencies: `yarn install` (or `npm install`)
5.  Build the extension: `spicetify-creator build-ext` (This will create the `app.js` in the `/dist` folder).
6.  Copy the built `app.js` to your Spicetify `Extensions` folder.
7.  Apply changes: `spicetify apply`

## Useful Links

- [Spicetify Creator - Building and Testing](https://spicetify.app/docs/development/spicetify-creator/building-and-testing/)
- [Spicetify Documentation](https://spicetify.app/)
- [node-vibrant (Color Extraction Library)](https://github.com/Vibrant-Colors/node-vibrant)
- [GSAP (Animation Library)](https://gsap.com/)
- [spcr-settings (Settings UI Helper)](https://github.com/FlafyDev/spicetify-creator-plugins/tree/main/packages/spcr-settings)
