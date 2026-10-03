import { createElement } from "./helpers";
import cardBack from "../assets/cards/cover.jpeg";

const cardImages = [
  ["heart", "Heart"],
  ["joystick", "Joystick"],
  ["coin", "Coin"],
  ["crab", "Crab"],
  ["packman", "Pac-Man"],
  ["cassette-tape", "Cassette tape"],
  ["controller", "Controller"],
  ["floppy-disk", "Floppy disk"],
];

function createCard(imageName, label, position) {
  const card = createElement("button", ["memory-card"]);
  card.type = "button";
  card.setAttribute("aria-label", `Face-down card ${position}`);
  card.setAttribute("aria-pressed", "false");
  card.dataset.image = imageName;
  card.dataset.label = label;
  card.style.setProperty("--card-back", `url("${cardBack}")`);
  return card;
}

function createBoard() {
  const board = createElement("div", ["card-grid"]);
  board.setAttribute("role", "group");
  board.setAttribute("aria-label", "Memory game cards");

  cardImages.forEach(([imageName, label], pairIndex) => {
    [0, 1].forEach((copyIndex) => {
      const position = pairIndex * 2 + copyIndex + 1;
      board.append(createCard(imageName, label, position));
    });
  });

  return board;
}

export { createBoard };
