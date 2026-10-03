import { createElement } from "./helpers";
import { createHeader } from "./createHeader";
import { createStats } from "./createStats";
import { createBoard } from "./createBoard";

function createComponent() {
  const frame = createElement("main", ["frame"]);
  frame.id = "frame";

  const content = createElement("div", ["game-content"]);
  content.append(createHeader(), createStats());

  const heading = createElement("h2", ["board-heading"]);
  heading.textContent = "Find all the matching pairs";
  const hint = createElement("p", ["board-hint"]);
  hint.textContent = "Choose two cards to reveal what’s underneath.";

  content.append(heading, hint, createBoard());

  const footer = createElement("footer", ["game-footer"]);
  footer.textContent = "Take your time. Remember what you see.";
  content.append(footer);

  frame.append(content);
  return frame;
}

export { createComponent };
