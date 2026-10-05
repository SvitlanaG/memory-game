import { createElement } from "./helpers";
import { createModal } from "./createModal";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${date.getFullYear()}`;
}

function createResultsTable(results) {
  const wrapper = createElement("div", ["leaderboard-table-wrap"]);
  const table = createElement("table", ["leaderboard-table"]);
  const caption = createElement("caption", ["sr-only"]);
  caption.textContent = "Top 10 game results";
  const head = createElement("thead", []);
  const headingRow = createElement("tr", []);

  ["Rank", "Moves", "Date"].forEach((label) => {
    const heading = createElement("th", []);
    heading.scope = "col";
    heading.textContent = label;
    headingRow.append(heading);
  });
  head.append(headingRow);

  const body = createElement("tbody", []);
  results.forEach((result, index) => {
    const row = createElement("tr", []);
    [String(index + 1), String(result.moves), formatDate(result.completedAt)].forEach((value) => {
      const cell = createElement("td", []);
      cell.textContent = value;
      row.append(cell);
    });
    body.append(row);
  });

  table.append(caption, head, body);
  wrapper.append(table);
  return wrapper;
}

function createLeaderboardModal() {
  const modal = createModal("Leaderboard");
  const closeButton = createElement("button", ["button", "button-secondary"]);
  closeButton.type = "button";
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", modal.close);
  modal.actions.append(closeButton);

  return {
    dialog: modal.dialog,
    open(results) {
      modal.content.replaceChildren();
      if (results.length === 0) {
        const emptyMessage = createElement("p", ["leaderboard-empty"]);
        emptyMessage.textContent = "No results yet.";
        modal.content.append(emptyMessage);
      } else {
        modal.content.append(createResultsTable(results));
      }
      modal.open();
    },
  };
}

export { createLeaderboardModal };
