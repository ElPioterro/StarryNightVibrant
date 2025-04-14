Below is a complete Markdown file tailored to your request for developing extensions and themes in Spicetify, based on our conversation. It’s designed for your project `SpicetifyProjectVibrant`, which includes the `StarryNight` theme and `theme-vibrant` extension. You can copy and paste this entire code block into a `.md` file (e.g., `SpicetifyDevelopmentGuide.md`) in your project folder for future reference.

# Spicetify Development Guide for SpicetifyProjectVibrant

This guide documents the process for developing and testing Spicetify themes and extensions, based on the `SpicetifyProjectVibrant` project. It includes a theme (`StarryNight`) and a TypeScript-based extension (`theme-vibrant`). The guide covers repository setup, symlinks for testing, building and watching changes, and working in VSCode, so you can pick up development anytime.

## Project Overview

- **Theme**: `StarryNight`, a Spicetify theme with files like `color.ini`, `theme.js`, and `user.css`.
- **Extension**: `theme-vibrant`, a TypeScript-based extension with TSX files in a `src/` folder, built into a single JS file (e.g., `dist/app.js`).
- **Repository**: `SpicetifyProjectVibrant`, a GitHub repository containing both theme and extension files.
- **Development Folder**: `C:\Users\piotr\Downloads\SpicetifyProjectVibrant\`.
- **Spicetify Config Folders**:
  - Themes: `C:\Users\piotr\AppData\Roaming\spicetify\Themes\`
  - Extensions: `C:\Users\piotr\AppData\Roaming\spicetify\Extensions\`

**Note**: The `theme-vibrant` extension is designed to work only with the `StarryNight` theme.

## 1. Setting Up the Repository

Organize your theme and extension in a single GitHub repository for easy management.

### Steps

1. **Create the Project Folder**:

   - Create a folder named `SpicetifyProjectVibrant` at `C:\Users\piotr\Downloads\SpicetifyProjectVibrant\`.

2. **Organize Files**:

   - Structure your repository like this:
     ```
     SpicetifyProjectVibrant/
       Themes/
         StarryNight/
           color.ini
           theme.js
           user.css
       Extensions/
         theme-vibrant/
           package.json
           tsconfig.json
           src/
             app.tsx
             ... (other TSX files)
           dist/
             app.js
       README.md
     ```
   - Move your existing theme files into `Themes/StarryNight/`.
   - Set up the extension in `Extensions/theme-vibrant/` using Spicetify Creator:
     ```bash
     npx create-spicetify-app
     ```

3. **Initialize Git Repository**:

   - Open a terminal in `SpicetifyProjectVibrant` and run:
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Add theme and extension files"
     ```
   - Create a new repository on GitHub (e.g., `SpicetifyProjectVibrant`).
   - Link and push:
     ```bash
     git remote add origin https://github.com/yourusername/SpicetifyProjectVibrant.git
     git branch -M main
     git push -u origin main
     ```

4. **Add a README**:

   - Create `README.md` with installation instructions:

     ````markdown
     # SpicetifyProjectVibrant

     A custom Spicetify theme (`StarryNight`) and extension (`theme-vibrant`) designed to work together.

     ## Installation

     1. Clone or download this repository.
     2. Copy `Themes/StarryNight` to `%APPDATA%\spicetify\Themes\`.
     3. Build the extension:
        ```bash
        cd Extensions/theme-vibrant
        npm install
        npm run build
        ```
     ````

     4. Add the extension:
        ```bash
        spicetify config extensions add C:\Users\piotr\Downloads\SpicetifyProjectVibrant\Extensions\theme-vibrant\dist\app.js
        ```
     5. Apply:
        ```bash
        spicetify config current_theme StarryNight
        spicetify apply
        ```

     **Note**: The extension requires the `StarryNight` theme.

   - Commit and push:
     ```bash
     git add README.md
     git commit -m "Add README with instructions"
     git push
     ```

## 2. Creating Symlinks for Testing

Symlinks let you edit files in your development folder and see changes in Spicetify’s config folders without manual copying.

### For the Theme (`StarryNight`)

1. **Check for Conflicts**:

   - Remove any existing `StarryNight` folder in Spicetify’s `Themes` directory:
     ```cmd
     rmdir C:\Users\piotr\AppData\Roaming\spicetify\Themes\StarryNight
     ```

2. **Create Symlink**:

   - Open Command Prompt as Administrator (right-click > Run as administrator).
   - Run:
     ```cmd
     mklink /D C:\Users\piotr\AppData\Roaming\spicetify\Themes\StarryNight C:\Users\piotr\Downloads\SpicetifyProjectVibrant\Themes\StarryNight
     ```

3. **Configure Spicetify**:
   - Set the theme:
     ```cmd
     spicetify config current_theme StarryNight
     spicetify apply
     ```

### For the Extension (`theme-vibrant`)

- **Note**: TypeScript extensions build to `dist/app.js`, typically added directly to Spicetify. Symlinks are optional for live updates.

1. **Build the Extension First**:

   - Navigate to the extension folder:
     ```cmd
     cd C:\Users\piotr\Downloads\SpicetifyProjectVibrant\Extensions\theme-vibrant
     ```
   - Install dependencies and build:
     ```cmd
     npm install
     npm run build
     ```

2. **Add to Spicetify**:

   - Add the built file:
     ```cmd
     spicetify config extensions add C:\Users\piotr\Downloads\SpicetifyProjectVibrant\Extensions\theme-vibrant\dist\app.js
     spicetify apply
     ```

3. **Optional Symlink** (for live updates):
   - Check for conflicts:
     ```cmd
     del C:\Users\piotr\AppData\Roaming\spicetify\Extensions\app.js
     ```
   - Create symlink:
     ```cmd
     mklink C:\Users\piotr\AppData\Roaming\spicetify\Extensions\app.js C:\Users\piotr\Downloads\SpicetifyProjectVibrant\Extensions\theme-vibrant\dist\app.js
     ```
   - **Important**: Rebuild (`npm run build`) after changes to update `dist/app.js`.

## 3. Building and Watching Changes

Use `npm run watch` for the extension and `spicetify watch` for real-time updates in Spotify.

### Working in VSCode

- **Open the Root Folder**: Open `C:\Users\piotr\Downloads\SpicetifyProjectVibrant` in VSCode. No need to open subfolders separately.
- **Why**: The root folder centralizes all tasks, and VSCode’s terminal uses the `package.json` in `Extensions/theme-vibrant`.

### For the Extension (`theme-vibrant`)

1. **Build Initially**:

   - In VSCode’s terminal, navigate to:
     ```cmd
     cd Extensions\theme-vibrant
     ```
   - Run:
     ```cmd
     npm run build
     ```
   - This compiles `src/` TSX files to `dist/app.js`.

2. **Watch for Changes**:

   - Run:
     ```cmd
     npm run watch
     ```
   - Watches `src/` and rebuilds `dist/app.js` automatically (defined in `package.json` as `"watch": "spicetify-creator watch"`).

3. **Watch Extension in Spicetify**:
   - In another terminal:
     ```cmd
     spicetify watch -e
     ```
     or (I've been using this ->>)
     ```cmd
     spicetify watch -le
     ```
   - Reloads the extension in Spotify when `dist/app.js` changes.

### For the Theme (`StarryNight`)

- **No Build Required**: Themes are static, so edits in `Themes/StarryNight/` (via symlink) apply directly.
- **Watch Changes**:
  - Run:
    ```cmd
    spicetify watch
    ```
  - Detects and applies theme changes in real-time.

### Workflow

- Open two VSCode terminals:
  - Terminal 1: `cd Extensions\theme-vibrant && npm run watch` (rebuilds extension).
  - Terminal 2: `spicetify watch -e` (reloads extension) or `spicetify watch` (theme and extension).
- Edit files:
  - Theme: `Themes/StarryNight/` (e.g., `user.css`).
  - Extension: `Extensions\theme-vibrant\src\` (e.g., `app.tsx`).
- Changes reflect in Spotify instantly.

## 4. Troubleshooting

- **Symlink Errors**:

  - Run Command Prompt as Administrator for `mklink`.
  - Clear existing files/folders with `del` (files) or `rmdir` (directories).
  - Enable Developer Mode in Windows Settings if permissions fail.

- **Build Failures**:

  - Check `package.json` and `tsconfig.json` in `Extensions/theme-vibrant`.
  - Run `npm install` to update dependencies.
  - Fix TypeScript errors in VSCode.

- **Spicetify Not Detecting Changes**:

  - Verify extension path with `spicetify config extensions list`.
  - Restart `spicetify watch -e` or reapply with `spicetify apply`.

- **VSCode Terminal**:
  - Ensure correct directory (`SpicetifyProjectVibrant` or `Extensions\theme-vibrant`) for `npm` commands.
  - Check `package.json` if `npm run watch` fails.

## 5. Sharing with the Community

Share your work with others:

1. **Update README**:

   - Add clear instructions, noting `theme-vibrant` requires `StarryNight`.

2. **Push to GitHub**:

   - Commit and push:
     ```bash
     git add .
     git commit -m "Update theme and extension"
     git push
     ```

3. **Optional: Submit to Spicetify Marketplace**:

   - See [Spicetify Marketplace Wiki](https://github.com/spicetify/marketplace/wiki/Development).
   - Specify dependency on `StarryNight`.

4. **Announce**:
   - Post on Reddit (r/spicetify) or Spicetify Discord with the GitHub link.

## 6. Best Practices

- **Version Control**: Commit often with descriptive messages (e.g., `git commit -m "Tweak theme colors"`).
- **Test Across Systems**: Test on Windows (and other OS if possible).
- **Backup Config**: Use `spicetify backup` before testing.
- **Update Dependencies**: Run `npm update` in `Extensions/theme-vibrant` periodically.

## 7. Example Commands

| **Action**                                     | **Command**                                                                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Create theme symlink                           | `mklink /D %APPDATA%\spicetify\Themes\StarryNight C:\Users\piotr\Downloads\SpicetifyProjectVibrant\Themes\StarryNight`  |
| Build extension                                | `cd Extensions\theme-vibrant && npm run build`                                                                          |
| Watch extension                                | `cd Extensions\theme-vibrant && npm run watch`                                                                          |
| Add extension                                  | `spicetify config extensions add C:\Users\piotr\Downloads\SpicetifyProjectVibrant\Extensions\theme-vibrant\dist\app.js` |
| Watch extension changes                        | `spicetify watch -e`                                                                                                    |
| Watch extension changes (outputs log messages) | `spicetify watch -le`                                                                                                   |
| Watch theme changes                            | `spicetify watch`                                                                                                       |
| Apply changes                                  | `spicetify apply`                                                                                                       |

## 8. Notes

- **TypeScript Workflow**: Spicetify Creator compiles `src/` TSX to `dist/app.js` using esbuild. Build before adding to Spicetify.
- **Symlinks vs. Direct Config**: Use symlinks for themes; for extensions, direct config is simpler unless live editing `dist/` is needed.
- **VSCode Efficiency**: Opening `SpicetifyProjectVibrant` centralizes tasks, avoiding multiple folder instances.

Happy coding! This guide ensures you can resume development anytime.

_Last Updated: April 14, 2025_
