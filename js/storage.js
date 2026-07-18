// Shared localStorage helpers for meal tracking and shopping list state

const STORAGE_KEY_MEALS = "mealplanner_meal_state_v1";
const STORAGE_KEY_SHOP = "mealplanner_shopping_state_v1";

function loadMealState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_MEALS)) || {};
  } catch (e) {
    return {};
  }
}

function saveMealState(state) {
  localStorage.setItem(STORAGE_KEY_MEALS, JSON.stringify(state));
}

function setMealChecked(day, mealIndex, checked) {
  const state = loadMealState();
  if (!state[day]) state[day] = {};
  state[day][mealIndex] = checked;
  saveMealState(state);
}

function isMealChecked(day, mealIndex) {
  const state = loadMealState();
  return !!(state[day] && state[day][mealIndex]);
}

function loadShopState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_SHOP)) || {};
  } catch (e) {
    return {};
  }
}

function saveShopState(state) {
  localStorage.setItem(STORAGE_KEY_SHOP, JSON.stringify(state));
}
