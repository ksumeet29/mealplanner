// Renders the weekly tracker: which meals were eaten per day, and macro totals consumed vs planned.

function computeDayConsumed(day) {
  const data = MEAL_PLAN[day];
  const consumed = { kcal: 0, protein: 0, fat: 0, carbs: 0, fib: 0 };
  const eatenMeals = [];
  data.meals.forEach((meal, idx) => {
    if (isMealChecked(day, idx)) {
      consumed.kcal += meal.kcal;
      consumed.protein += meal.protein;
      consumed.fat += meal.fat;
      consumed.carbs += meal.carbs;
      consumed.fib += meal.fib;
      eatenMeals.push(meal.name);
    }
  });
  return { consumed, eatenMeals };
}

function pct(consumed, target) {
  if (!target) return 0;
  return Math.min(100, Math.round((consumed / target) * 100));
}

function renderTracker() {
  const tbody = document.getElementById("tracker-body");
  tbody.innerHTML = "";

  const weekTotals = { kcal: 0, protein: 0, fat: 0, carbs: 0, fib: 0 };
  const weekTargets = { kcal: 0, protein: 0, fat: 0, carbs: 0, fib: 0 };

  DAY_ORDER.forEach((day) => {
    const data = MEAL_PLAN[day];
    const { consumed, eatenMeals } = computeDayConsumed(day);
    const target = data.target;

    weekTotals.kcal += consumed.kcal;
    weekTotals.protein += consumed.protein;
    weekTotals.fat += consumed.fat;
    weekTotals.carbs += consumed.carbs;
    weekTotals.fib += consumed.fib;

    weekTargets.kcal += target.kcal;
    weekTargets.protein += target.protein;
    weekTargets.fat += target.fat;
    weekTargets.carbs += target.carbs;
    weekTargets.fib += target.fib;

    const mealCount = data.meals.length;
    const eatenCount = eatenMeals.length;
    const kcalPct = pct(consumed.kcal, target.kcal);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><a href="${day.toLowerCase()}.html">${day}</a>${data.note ? ` <span class="badge">${data.note}</span>` : ""}</td>
      <td>${eatenCount}/${mealCount}<br><span style="color:var(--muted);font-size:0.78rem">${eatenMeals.join(", ") || "—"}</span></td>
      <td>${consumed.kcal} / ${target.kcal} kcal
        <div class="progress-bar-outer"><div class="progress-bar-inner${kcalPct >= 100 ? " over" : ""}" style="width:${kcalPct}%"></div></div>
      </td>
      <td>${consumed.protein.toFixed(1)} / ${target.protein} g</td>
      <td>${consumed.fat.toFixed(1)} / ${target.fat} g</td>
      <td>${consumed.carbs.toFixed(1)} / ${target.carbs} g</td>
      <td>${consumed.fib.toFixed(1)} / ${target.fib} g</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("week-summary").innerHTML = `
    <strong>Week so far:</strong>
    ${weekTotals.kcal} / ${weekTargets.kcal} kcal ·
    ${weekTotals.protein.toFixed(1)} / ${weekTargets.protein.toFixed(1)} g protein ·
    ${weekTotals.fat.toFixed(1)} / ${weekTargets.fat.toFixed(1)} g fat ·
    ${weekTotals.carbs.toFixed(1)} / ${weekTargets.carbs.toFixed(1)} g carbs ·
    ${weekTotals.fib.toFixed(1)} / ${weekTargets.fib.toFixed(1)} g fibre
  `;
}

function resetWeek() {
  if (confirm("Reset all checked meals for the whole week?")) {
    saveMealState({});
    renderTracker();
  }
}

document.addEventListener("DOMContentLoaded", renderTracker);
