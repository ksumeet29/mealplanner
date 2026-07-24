// Meal plan generation engine — deterministic, fully client-side, no network
// or AI calls. Given daily macro targets (from macroEngine.js) and a list of
// ingredients the user has selected (from foodDatabase.js), it builds a
// 7-day meal plan in the same shape as the original static MEAL_PLAN in
// data.js, so day.js / tracker.js can render it unchanged.

const MEAL_SLOTS = [
  { name: "Breakfast", frac: 0.25 },
  { name: "Snack 1", frac: 0.1 },
  { name: "Lunch", frac: 0.3 },
  { name: "Snack 2", frac: 0.1 },
  { name: "Dinner", frac: 0.25 }
];

function clampGrams(grams, min, max) {
  if (!isFinite(grams) || grams <= 0) return 0;
  return Math.min(max, Math.max(min, grams));
}

function macrosForGrams(item, grams) {
  const factor = grams / 100;
  return {
    kcal: item.kcal * factor,
    protein: item.protein * factor,
    fat: item.fat * factor,
    carbs: item.carbs * factor,
    fib: item.fib * factor
  };
}

// Builds a single meal (one slot on one day) from the picked ingredients,
// solving portions so the meal's macros land close to its share of the daily
// target. Because a "carb" item still has some protein (and vice versa), the
// grams for each role are refined over a few iterations (Gauss-Seidel style)
// so cross-contributed macros are accounted for instead of double-counted.
// Each ingredient's grams are added to `usageTotals` (used later to build the
// shopping list).
function buildMeal(slotName, slotTarget, picks, usageTotals) {
  const veg = picks.veg ? macrosForGrams(picks.veg, 100) : { kcal: 0, protein: 0, fat: 0, carbs: 0, fib: 0 };
  const grams = { protein: 0, fat: 0, carb: 0 };

  for (let iter = 0; iter < 4; iter++) {
    if (picks.protein) {
      const fromFat = picks.fat ? (picks.fat.protein / 100) * grams.fat : 0;
      const fromCarb = picks.carb ? (picks.carb.protein / 100) * grams.carb : 0;
      const need = Math.max(0, slotTarget.protein - fromFat - fromCarb - veg.protein);
      grams.protein = picks.protein.protein > 0 ? clampGrams((need * 100) / picks.protein.protein, 20, 300) : 0;
    }
    if (picks.fat) {
      const fromProtein = picks.protein ? (picks.protein.fat / 100) * grams.protein : 0;
      const fromCarb = picks.carb ? (picks.carb.fat / 100) * grams.carb : 0;
      const need = Math.max(0, slotTarget.fat - fromProtein - fromCarb - veg.fat);
      grams.fat = picks.fat.fat > 0 ? clampGrams((need * 100) / picks.fat.fat, 3, 40) : 0;
    }
    if (picks.carb) {
      const fromProtein = picks.protein ? (picks.protein.carbs / 100) * grams.protein : 0;
      const fromFat = picks.fat ? (picks.fat.carbs / 100) * grams.fat : 0;
      const need = Math.max(0, slotTarget.carbs - fromProtein - fromFat - veg.carbs);
      grams.carb = picks.carb.carbs > 0 ? clampGrams((need * 100) / picks.carb.carbs, 20, 300) : 0;
    }
  }

  const parts = [];
  const totals = { kcal: 0, protein: 0, fat: 0, carbs: 0, fib: 0 };

  function addPart(item, g) {
    g = Math.round(g);
    if (g <= 0) return;
    const m = macrosForGrams(item, g);
    totals.kcal += m.kcal;
    totals.protein += m.protein;
    totals.fat += m.fat;
    totals.carbs += m.carbs;
    totals.fib += m.fib;
    parts.push(`${g} g ${item.name}`);
    usageTotals[item.id] = (usageTotals[item.id] || 0) + g;
  }

  if (picks.protein) addPart(picks.protein, grams.protein);
  if (picks.fat) addPart(picks.fat, grams.fat);
  if (picks.carb) addPart(picks.carb, grams.carb);
  if (picks.veg) addPart(picks.veg, 100);

  return {
    name: slotName,
    recipe: parts.length ? parts.join(" + ") : "Add ingredients in Planner to fill this meal",
    kcal: round1(totals.kcal),
    protein: round1(totals.protein),
    fat: round1(totals.fat),
    carbs: round1(totals.carbs),
    fib: round1(totals.fib)
  };
}

function round1(n) {
  return Math.round(n * 10) / 10;
}

// dailyTarget: { calories, protein, fat, carbs } from macroEngine's computeMacroPlan()
// selectedIds: array of foodDatabase ingredient ids the user picked
// returns { plan, shoppingTotals, warnings }
function generateWeekPlan(dailyTarget, selectedIds) {
  const byCategory = groupFoodsByCategory(selectedIds);
  const warnings = [];
  ["protein", "carb", "fat", "veg"].forEach((cat) => {
    if (!byCategory[cat].length) {
      warnings.push(
        `No ${FOOD_CATEGORY_LABELS[cat].toLowerCase()} selected — add at least one so the plan can hit its targets.`
      );
    }
  });

  const usageTotals = {};
  const plan = {};

  DAY_ORDER.forEach((day, dayIndex) => {
    const target = {
      kcal: dailyTarget.calories,
      protein: dailyTarget.protein,
      fat: dailyTarget.fat,
      carbs: dailyTarget.carbs,
      fib: round1(dailyTarget.carbs * 0.12) // heuristic fibre target, ~12% of carb grams
    };

    const meals = MEAL_SLOTS.map((slot, slotIndex) => {
      const slotTarget = {
        protein: target.protein * slot.frac,
        fat: target.fat * slot.frac,
        carbs: target.carbs * slot.frac
      };

      const rotation = dayIndex + slotIndex;
      const picks = {};
      ["protein", "carb", "fat", "veg"].forEach((cat) => {
        const list = byCategory[cat];
        if (list.length) picks[cat] = list[rotation % list.length];
      });

      return buildMeal(slot.name, slotTarget, picks, usageTotals);
    });

    plan[day] = { note: "", target, meals };
  });

  return { plan, shoppingTotals: usageTotals, warnings };
}

// Converts accumulated weekly ingredient usage into the same
// { frequency -> category -> [{item, qty}] } shape as the static SHOPPING_LIST,
// so shopping.js can render it without changes.
function buildShoppingList(shoppingTotals) {
  const categories = { protein: {}, carb: {}, fat: {}, veg: {} };

  Object.entries(shoppingTotals).forEach(([id, grams]) => {
    const item = getFoodById(id);
    if (!item) return;
    categories[item.category][item.name] = grams;
  });

  const result = { "This Week (generated from your plan)": {} };
  Object.entries(categories).forEach(([cat, items]) => {
    const entries = Object.entries(items);
    if (!entries.length) return;
    result["This Week (generated from your plan)"][FOOD_CATEGORY_LABELS[cat]] = entries.map(
      ([name, grams]) => ({
        item: name,
        qty: grams >= 1000 ? `${(grams / 1000).toFixed(2)} kg` : `${Math.round(grams)} g`
      })
    );
  });

  return result;
}
