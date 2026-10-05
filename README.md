# Memory Match

A browser-based memory matching game built with vanilla JavaScript and SCSS. Flip cards to find all eight image pairs in as few moves as possible.

## Play

The game starts with 16 shuffled, face-down cards. Select two cards to make a move:

- Matching cards stay face-up.
- Non-matching cards stay visible briefly, then turn face-down again.
- Find all eight pairs to finish the game and see your move total.
- Use **New Game** at any time to reshuffle and reset the board.
- Open **Leaderboard** to see up to 10 saved results.

Leaderboard results are stored in your browser using `localStorage`, ordered by fewest moves and then earliest completion. They remain on that browser until its site data is cleared.

## Run locally

Requirements: Node.js and npm.

```bash
npm ci
npm start
```

Webpack Dev Server opens the game at [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build-dev
npm run build-prod
```

Webpack writes the built app to `dist/`.

## Deploy to GitHub Pages

The project includes the `gh-pages` package and a deploy script. Build and publish the contents of `dist/` to the `gh-pages` branch with:

```bash
npm run deploy
```

In the GitHub repository, open **Settings → Pages** and select **Deploy from a branch**, branch **gh-pages**, folder **/(root)**. After Pages publishes the site, it will be available at:

[https://svitlanag.github.io/memory-game/](https://svitlanag.github.io/memory-game/)

## Project structure

```text
src/
├── assets/cards/        Card face and card back images
├── modules/             UI components, game logic, and leaderboard storage
└── style/
    ├── abstracts/       Colors, variables, and mixins
    ├── base/            Fonts, normalization, and utilities
    └── components/      Component and layout styles
```

## Tech

- JavaScript (ES modules)
- SCSS
- Webpack
- Browser `localStorage`
