const STORAGE_KEY = "memory-match-leaderboard";
const MAX_RESULTS = 10;

function sortResults(results) {
  return [...results].sort((first, second) => {
    if (first.moves !== second.moves) return first.moves - second.moves;
    return first.completedAt - second.completedAt;
  });
}

function loadResults() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return sortResults(saved.filter((result) =>
      Number.isInteger(result.moves) && result.moves >= 0 &&
      Number.isFinite(result.completedAt),
    )).slice(0, MAX_RESULTS);
  } catch (error) {
    return [];
  }
}

function saveResult(moves) {
  const results = sortResults([
    ...loadResults(),
    { moves, completedAt: Date.now() },
  ]).slice(0, MAX_RESULTS);

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch (error) {
    // The game remains playable when browser storage is unavailable.
  }
}

export { loadResults, saveResult };
