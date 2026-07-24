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

// --- Calculator + Planner state (all client-side, no account/login needed) ---

const STORAGE_KEY_PROFILE = "mealplanner_profile_v1";
const STORAGE_KEY_MACROS = "mealplanner_macros_v1";
const STORAGE_KEY_INGREDIENTS = "mealplanner_selected_ingredients_v1";
const STORAGE_KEY_PLAN = "mealplanner_generated_plan_v1";
const STORAGE_KEY_GEN_SHOP = "mealplanner_generated_shopping_v1";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function saveProfile(profile) {
  writeJSON(STORAGE_KEY_PROFILE, profile);
}

function loadProfile() {
  return readJSON(STORAGE_KEY_PROFILE, null);
}

function saveMacros(macros) {
  writeJSON(STORAGE_KEY_MACROS, macros);
}

function loadMacros() {
  return readJSON(STORAGE_KEY_MACROS, null);
}

function saveSelectedIngredients(ids) {
  writeJSON(STORAGE_KEY_INGREDIENTS, ids);
}

function loadSelectedIngredients() {
  return readJSON(STORAGE_KEY_INGREDIENTS, []);
}

function saveGeneratedPlan(plan) {
  writeJSON(STORAGE_KEY_PLAN, plan);
}

function loadGeneratedPlan() {
  return readJSON(STORAGE_KEY_PLAN, null);
}

function saveGeneratedShopping(list) {
  writeJSON(STORAGE_KEY_GEN_SHOP, list);
}

function loadGeneratedShopping() {
  return readJSON(STORAGE_KEY_GEN_SHOP, null);
}

function clearGeneratedPlan() {
  localStorage.removeItem(STORAGE_KEY_PLAN);
  localStorage.removeItem(STORAGE_KEY_GEN_SHOP);
}
