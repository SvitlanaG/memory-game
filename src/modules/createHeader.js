import { createElement } from "./helpers";

function createHeader() {
  const header = createElement("header", ["game-header"]);
  const brand = createElement("div", ["brand"]);
  const mark = createElement("span", ["brand-mark"]);
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = "@";

  const title = createElement("h1", ["game-title"]);
  title.textContent = "Memory Match";
  brand.append(mark, title);

  const actions = createElement("nav", ["header-actions"]);
  actions.setAttribute("aria-label", "Game controls");

  const newGameButton = createElement("button", ["button", "button-primary"]);
  newGameButton.type = "button";
  newGameButton.textContent = "New Game";
  newGameButton.setAttribute("aria-label", "Start a new game");

  const leaderboardButton = createElement("button", [
    "button",
    "button-secondary",
  ]);
  leaderboardButton.type = "button";
  leaderboardButton.textContent = "Leaderboard";
  leaderboardButton.setAttribute("aria-label", "View leaderboard");

  actions.append(newGameButton, leaderboardButton);
  header.append(brand, actions);
  return header;
}

export { createHeader };
