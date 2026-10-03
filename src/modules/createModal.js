import { createElement } from "./helpers";

let modalId = 0;

function createModal(titleText) {
  modalId += 1;
  const dialog = createElement("dialog", ["modal"]);
  const panel = createElement("div", ["modal-panel"]);
  const title = createElement("h2", ["modal-title"]);
  title.id = `modal-title-${modalId}`;
  title.textContent = titleText;
  dialog.setAttribute("aria-labelledby", title.id);

  const content = createElement("div", ["modal-content"]);
  const actions = createElement("div", ["modal-actions"]);
  panel.append(title, content, actions);
  dialog.append(panel);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  return {
    dialog,
    content,
    actions,
    open() {
      if (!dialog.open) dialog.showModal();
    },
    close() {
      if (dialog.open) dialog.close();
    },
  };
}

export { createModal };
