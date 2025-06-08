# Spicetify Project - StarryNightVibrant - Dynamic Gradient

A custom Spicetify theme and extension that dynamically changes the background gradient based on the currently playing song's cover art. It offers several modes for how the gradient updates and animates.

This project is a rework and expansion of the original StarryNight theme concept, adding dynamic gradient functionality and user configuration options.

## Features

- **Dynamic Background:** Extracts colors from the current song's cover art to create a smooth background gradient.
- **Multiple Modes:**
  - **Static:** Sets one gradient per song using the primary color.
  - **Random Static:** Sets one gradient per song using a random color from the palette.
  - **Progress-Based:** Cycles through multiple colors from the palette as the song progresses.
- **Configurable Animation:** Choose between fixed or dynamic animation durations, with options for faster initial transitions.
- **Settings Menu:** Easily configure modes, sections (for Progress-Based), and animation timings via the Spicetify settings menu.

## Note

This extension is designed to work primarily with the accompanying `StarryNight` theme files, which define the necessary CSS variables (`--gradient-main`, `--gradient-secondary`). Using it with other themes might require manual CSS adjustments in those themes.

## Tested Environment

This extension and theme were tested on:

- **Spotify:** Spotify for Windows (64 bit) - `1.2.14.1149.ga3ae422d`
- **Spicetify:** `v2.39.6`

_(Compatibility with other versions/platforms may vary.)_

## Installation

1.  **Clone/Download:** Get the project files.
2.  **Copy Theme:** Place the `StarryNight` folder into your Spicetify `Themes` directory.
    - _Find your Spicetify directories by running `spicetify -c`._
3.  **Copy Extension:** Place the final `theme-vibrant.js` from the `dist` (or your build output) folder into your Spicetify `Extensions` directory.
4.  **Apply:** Run the following commands in your terminal:
    ```bash
    spicetify config current_theme StarryNight color_scheme base
    spicetify config extensions theme-vibrant.js # Or the name you used for the build output
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
5.  Build the extension: `spicetify-creator build-ext` (This will create the `theme-vibrant.js` in the `/dist` folder).
6.  Copy the built `theme-vibrant.js` to your Spicetify `Extensions` folder.
7.  Apply changes: `spicetify apply`

## Useful Links

- [Spicetify Creator - Building and Testing](https://spicetify.app/docs/development/spicetify-creator/building-and-testing/)
- [Spicetify Documentation](https://spicetify.app/)
- [node-vibrant (Color Extraction Library)](https://github.com/Vibrant-Colors/node-vibrant)
- [GSAP (Animation Library)](https://gsap.com/)
- [spcr-settings (Settings UI Helper)](https://github.com/FlafyDev/spicetify-creator-plugins/tree/main/packages/spcr-settings)

## Acknowledgements

- **Original Theme Concept:** This theme is heavily inspired by and builds upon the **StarryNight** theme created by **[b-chen00](https://github.com/b-chen00)**. You can find the original theme here: [spicetify-themes/StarryNight](https://github.com/spicetify/spicetify-themes/tree/master/StarryNight).
- **Shooting Stars CSS:** The shooting star animation effect used in the theme was created by **Delroy Prithvi**.

  - Source: [CodePen](https://codepen.io/delroyprithvi/pen/LYyJROR)
  - License:

    ```
    Pure CSS Shooting Star Animation Effect Copyright (c) 2021 by Delroy Prithvi (https://codepen.io/delroyprithvi/pen/LYyJROR)

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    ```
## **License**

[LICENSE](LICENSE.md)
