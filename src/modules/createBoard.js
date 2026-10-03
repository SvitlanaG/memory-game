import { createElement } from "./helpers";
import cardBack from "../assets/cards/cover.jpeg";
import heart from "../assets/cards/heart.jpeg";
import joystick from "../assets/cards/joystick.jpeg";
import coin from "../assets/cards/coin.jpeg";
import crab from "../assets/cards/crab.jpeg";
import packman from "../assets/cards/packman.jpeg";
import cassetteTape from "../assets/cards/cassette-tape.jpeg";
import controller from "../assets/cards/controller.jpeg";
import floppyDisk from "../assets/cards/floppy-disk.jpeg";

const cardImages = [
  ["heart", "Heart", heart],
  ["joystick", "Joystick", joystick],
  ["coin", "Coin", coin],
  ["crab", "Crab", crab],
  ["packman", "Pac-Man", packman],
  ["cassette-tape", "Cassette tape", cassetteTape],
  ["controller", "Controller", controller],
  ["floppy-disk", "Floppy disk", floppyDisk],
];

function createCard(imageName, label, frontImage, position) {
  const card = createElement("button", ["memory-card"]);
  card.type = "button";
  card.setAttribute("aria-label", `Face-down card ${position}`);
  card.setAttribute("aria-pressed", "false");
  card.dataset.image = imageName;
  card.dataset.label = label;
  card.dataset.position = position;
  card.style.setProperty("--card-back", `url("${cardBack}")`);
  card.style.setProperty("--card-front", `url("${frontImage}")`);
  return card;
}

function createBoard() {
  const board = createElement("div", ["card-grid"]);
  board.setAttribute("role", "group");
  board.setAttribute("aria-label", "Memory game cards");

  cardImages.forEach(([imageName, label, frontImage], pairIndex) => {
    [0, 1].forEach((copyIndex) => {
      const position = pairIndex * 2 + copyIndex + 1;
      board.append(createCard(imageName, label, frontImage, position));
    });
  });

  return board;
}

export { createBoard };
