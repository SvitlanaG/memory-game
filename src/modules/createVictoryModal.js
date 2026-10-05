import { createElement } from "./helpers";
import { createModal } from "./createModal";

function createVictoryModal(onNewGame) {
  const modal = createModal("You won!");
  const message = createElement("p", ["victory-message"]);
  modal.content.append(message);

  const newGameButton = createElement("button", ["button", "button-primary"]);
  newGameButton.type = "button";
  newGameButton.textContent = "New Game";
  newGameButton.addEventListener("click", onNewGame);

  const closeButton = createElement("button", ["button", "button-secondary"]);
  closeButton.type = "button";
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", modal.close);

  modal.actions.append(newGameButton, closeButton);

  return {
    dialog: modal.dialog,
    open(moves) {
      message.textContent = `You found all 8 pairs in ${moves} ${moves === 1 ? "move" : "moves"}.`;
      modal.open();
    },
    close: modal.close,
  };
}

export { createVictoryModal };
