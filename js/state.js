// Central helpers that decide whether pages show the user's generated plan
// (calculator + planner completed) or fall back to the bundled demo plan in
// data.js. Keeping this logic in one place means day.js / tracker.js /
// shopping.js / index.html don't need to know about the fallback rules.

function hasGeneratedPlan() {
  return !!loadGeneratedPlan();
}

function getActiveMealPlan() {
  return loadGeneratedPlan() || MEAL_PLAN;
}

function getActiveShoppingList() {
  return loadGeneratedShopping() || SHOPPING_LIST;
}

// Returns the overall daily target shown on the home page: the user's own
// computed macros if available, otherwise the demo plan's fixed target.
function getActiveOverallTarget() {
  const macros = loadMacros();
  if (macros) {
    return {
      kcal: macros.calories,
      protein: macros.protein,
      fat: macros.fat,
      carbs: macros.carbs,
      fib: null
    };
  }
  return OVERALL_TARGET;
}
