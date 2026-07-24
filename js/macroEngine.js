// Macro & TDEE calculation engine.
// Ported 1:1 from macros_calculator's C++ core (tdee.cpp / macros.cpp) so the
// site no longer depends on a compiled binary or a server process — everything
// runs client-side in the browser.
//
// UserInput shape expected by the functions below:
// {
//   weightKg, heightCm, age,
//   sex: "male" | "female",
//   bodyFatPercent,
//   trainingDaysPerWeek,
//   goal: "fatloss" | "maintenance" | "musclegain",
//   deficitCalories,
//   tdeeMethod: "mifflin" | "harris" | "katch",
//   activityMultiplier
// }

function mifflinStJeor(u) {
  return u.sex === "male"
    ? 10 * u.weightKg + 6.25 * u.heightCm - 5 * u.age + 5
    : 10 * u.weightKg + 6.25 * u.heightCm - 5 * u.age - 161;
}

function harrisBenedict(u) {
  return u.sex === "male"
    ? 13.397 * u.weightKg + 4.799 * u.heightCm - 5.677 * u.age + 88.362
    : 9.247 * u.weightKg + 3.098 * u.heightCm - 4.33 * u.age + 447.593;
}

function katchMcArdle(u) {
  const leanMass = u.weightKg * (1.0 - u.bodyFatPercent / 100.0);
  return 370 + 21.6 * leanMass;
}

function calculateAllTDEE(u) {
  return {
    mifflin: mifflinStJeor(u),
    harris: harrisBenedict(u),
    katch: katchMcArdle(u)
  };
}

function applyActivityMultiplier(bmr, multiplier) {
  return bmr * multiplier;
}

function calculateTDEE(u, base, multiplier) {
  switch (u.tdeeMethod) {
    case "harris":
      return applyActivityMultiplier(base.harris, multiplier);
    case "katch":
      return applyActivityMultiplier(base.katch, multiplier);
    default:
      return applyActivityMultiplier(base.mifflin, multiplier);
  }
}

function calculateMacros(calories, u) {
  let proteinPerKg;
  let fatPerKg;
  const deficit = u.goal === "fatloss" ? u.deficitCalories : 0;

  switch (u.goal) {
    case "fatloss":
      proteinPerKg = 1.4;
      fatPerKg = 0.6;
      break;
    case "musclegain":
      proteinPerKg = 2;
      fatPerKg = 0.7;
      break;
    default:
      proteinPerKg = 1.2;
      fatPerKg = 0.7;
  }

  const targetCalories = calories - deficit;

  const proteinGrams = proteinPerKg * u.weightKg;
  const fatGrams = fatPerKg * u.weightKg;

  const proteinCalories = proteinGrams * 4;
  const fatCalories = fatGrams * 9;

  const remainingCalories = targetCalories - (proteinCalories + fatCalories);
  const carbsGrams = remainingCalories / 4;

  return {
    calories: targetCalories,
    protein: proteinGrams,
    fat: fatGrams,
    carbs: Math.max(0, carbsGrams),
    deficit
  };
}

// Runs the full pipeline (BMR -> TDEE -> macros) and returns a single result
// object, mirroring the JSON the old C++ binary printed to stdout.
function computeMacroPlan(u) {
  const base = calculateAllTDEE(u);
  const tdee = calculateTDEE(u, base, u.activityMultiplier);
  const macros = calculateMacros(tdee, u);

  return {
    mifflin: round(base.mifflin, 2),
    harris: round(base.harris, 2),
    katch: round(base.katch, 2),
    tdee: round(tdee, 0),
    calories: round(macros.calories, 0),
    deficit: macros.deficit,
    protein: round(macros.protein, 1),
    fat: round(macros.fat, 1),
    carbs: round(macros.carbs, 1)
  };
}

function round(value, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

// Unit helpers used by the calculator form (lb -> kg, in -> cm)
function lbToKg(lb) {
  return lb * 0.45359237;
}

function inToCm(inches) {
  return inches * 2.54;
}
