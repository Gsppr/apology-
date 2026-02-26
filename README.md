# Apology Website

A polished, mobile-first apology website with a respectful and mature tone.  
Designed to feel sincere, emotional, and classy — not romantic or dramatic.

## Project Structure

apology website/
- index.html
- css/
  - styles.css
- js/
  - script.js
- assets/
  - music.mp3 (optional)
- README.md

## Features

- Elegant animated dark gradient background
- Ambient glow blobs + floating particles
- Typewriter intro message
- Soft glow highlight for Han
- Glassmorphism cards
- Smooth reveal animations
- Forgiveness action buttons with feedback
- Lightweight canvas confetti
- Optional background music on first interaction
- Responsive mobile-first layout
- Reduced-motion accessibility support

## Customize Name and Text

- Update intro lines in `js/script.js` inside `typeLines`.
- Update any card/button/message text in `index.html`.
- To change glow-highlighted name, update `applyHanHighlight()` in `js/script.js`.

## Add Music (Optional)

1. Put your file at `assets/music.mp3`.
2. Keep `<audio id="bgMusic" src="assets/music.mp3" ...>` in `index.html`.
3. Music starts only after first user interaction to respect browser autoplay policies.

## Deploy

### One-command publish (automatic)

1. Install GitHub CLI and login once:
  - `gh auth login`
2. Run from this folder:
  - `./publish.ps1 -RepoName "apology-website" -Visibility public`

This will initialize git (if needed), commit files, create the GitHub repo, push to `main`, and trigger auto-deploy via GitHub Actions.

### GitHub Pages

1. Push files to a GitHub repository.
2. Open **Settings → Pages**.
3. Set source to **GitHub Actions**.
4. Save and wait for deployment.

### Netlify

1. Open Netlify and choose **Add new site**.
2. Deploy via Git repo or drag-drop the project folder.
3. Use the generated HTTPS URL.

### Vercel

1. Import repository in Vercel.
2. Select static site/default options.
3. Deploy and copy the generated HTTPS URL.

## Share on WhatsApp

1. Deploy the project first.
2. Copy the live HTTPS link.
3. Send the link via WhatsApp.

Tip: Test the link on your phone before sending.
