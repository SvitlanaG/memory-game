import { createVictoryModal } from "./createVictoryModal";
import { createLeaderboardModal } from "./createLeaderboardModal";
import { loadResults, saveResult } from "./leaderboardStorage";

const PAIR_COUNT = 8;
const MISMATCH_DELAY_MS = 1500;

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }
  return shuffled;
}

function initializeGame(frame) {
  const board = frame.querySelector(".card-grid");
  const moveCounter = frame.querySelector("#stat-moves");
  const pairCounter = frame.querySelector("#stat-pairs");
  const announcer = frame.querySelector("#game-announcer");
  const newGameButton = frame.querySelector(".header-actions .button-primary");
  const leaderboardButton = frame.querySelector(".header-actions .button-secondary");
  const cards = Array.from(board.querySelectorAll(".memory-card"));

  let firstCard = null;
  let moves = 0;
  let pairsFound = 0;
  let boardLocked = false;
  let gameComplete = false;
  let mismatchTimer = null;
  let victoryModal;
  let leaderboardModal;
  let resultSaved = false;

  function setCardFaceDown(card) {
    card.classList.remove("is-revealed", "is-matched");
    card.setAttribute("aria-pressed", "false");
    card.setAttribute("aria-label", `Face-down card ${card.dataset.position}`);
  }

  function revealCard(card) {
    card.classList.add("is-revealed");
    card.setAttribute("aria-pressed", "true");
    card.setAttribute("aria-label", `${card.dataset.label}, revealed`);
  }

  function updateCounters() {
    moveCounter.textContent = String(moves);
    pairCounter.textContent = String(pairsFound);
  }

  function announceTurn(message) {
    announcer.textContent = "";
    window.requestAnimationFrame(() => {
      announcer.textContent = message;
    });
  }

  function renderShuffledCards() {
    shuffle(cards).forEach((card, index) => {
      card.dataset.position = String(index + 1);
      setCardFaceDown(card);
      card.dataset.matched = "false";
      board.append(card);
    });
  }

  function startNewGame() {
    if (victoryModal) victoryModal.close();
    if (mismatchTimer !== null) {
      window.clearTimeout(mismatchTimer);
      mismatchTimer = null;
    }

    firstCard = null;
    moves = 0;
    pairsFound = 0;
    boardLocked = false;
    board.setAttribute("aria-disabled", "false");
    gameComplete = false;
    resultSaved = false;
    updateCounters();
    renderShuffledCards();
    announcer.textContent = "New game started. 16 face-down cards.";
  }

  function handleCardClick(event) {
    const card = event.currentTarget;
    if (
      boardLocked ||
      gameComplete ||
      card.dataset.matched === "true" ||
      card === firstCard
    ) {
      return;
    }

    revealCard(card);

    if (!firstCard) {
      firstCard = card;
      return;
    }

    moves += 1;
    updateCounters();

    if (firstCard.dataset.image === card.dataset.image) {
      firstCard.classList.remove("is-revealed");
      firstCard.classList.add("is-matched");
      card.classList.remove("is-revealed");
      card.classList.add("is-matched");
      firstCard.dataset.matched = "true";
      card.dataset.matched = "true";
      firstCard.setAttribute(
        "aria-label",
        `${firstCard.dataset.label}, matched`,
      );
      card.setAttribute("aria-label", `${card.dataset.label}, matched`);
      pairsFound += 1;
      updateCounters();
      firstCard = null;

      if (pairsFound === PAIR_COUNT) {
        gameComplete = true;
        if (!resultSaved) {
          saveResult(moves);
          resultSaved = true;
        }
        victoryModal.open(moves);
        announceTurn(
          `You found all 8 pairs in ${moves} ${moves === 1 ? "move" : "moves"}.`,
        );
      } else {
        announceTurn(
          `Match found. ${moves} ${moves === 1 ? "move" : "moves"}. ${pairsFound} of 8 pairs found.`,
        );
      }
      return;
    }

    const firstMismatch = firstCard;
    const secondMismatch = card;
    firstCard = null;
    boardLocked = true;
    board.setAttribute("aria-disabled", "true");
    announceTurn(`No match. ${moves} ${moves === 1 ? "move" : "moves"}.`);

    mismatchTimer = window.setTimeout(() => {
      setCardFaceDown(firstMismatch);
      setCardFaceDown(secondMismatch);
      mismatchTimer = null;
      boardLocked = false;
      board.setAttribute("aria-disabled", "false");
    }, MISMATCH_DELAY_MS);
  }

  victoryModal = createVictoryModal(startNewGame);
  leaderboardModal = createLeaderboardModal();
  frame.append(victoryModal.dialog, leaderboardModal.dialog);

  leaderboardButton.addEventListener("click", () => {
    leaderboardModal.open(loadResults());
  });

  cards.forEach((card) => card.addEventListener("click", handleCardClick));
  newGameButton.addEventListener("click", startNewGame);
  startNewGame();
}

export { initializeGame };
