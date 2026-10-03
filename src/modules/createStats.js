import { createElement } from "./helpers";

function createStat(label, value, id, total) {
  const stat = createElement("div", ["stat"]);
  const caption = createElement("span", ["stat-label"]);
  caption.textContent = label;

  const number = createElement("strong", ["stat-value"]);
  number.id = `stat-${id}`;
  number.textContent = value;
  stat.append(caption, number);

  if (total) {
    const totalLabel = createElement("span", ["stat-total"]);
    totalLabel.textContent = `/ ${total}`;
    stat.append(totalLabel);
  }

  return stat;
}

function createStats() {
  const stats = createElement("section", ["stats"]);
  stats.setAttribute("aria-label", "Game score");
  stats.setAttribute("aria-live", "off");
  stats.append(
    createStat("Moves", "0", "moves"),
    createStat("Pairs found", "0", "pairs", 8),
  );
  return stats;
}

export { createStats };
