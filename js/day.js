// Renders a single day's meal list with checkboxes, using CURRENT_DAY global set in each day page.

function renderDayPage() {
  const day = window.CURRENT_DAY;
  const data = MEAL_PLAN[day];
  if (!data) return;

  document.getElementById("day-title").textContent = day + (data.note ? ` (${data.note})` : "");
  const t = data.target;
  document.getElementById("day-summary").textContent =
    `Target: ${t.kcal} kcal · ${t.protein} P · ${t.fat} F · ${t.carbs} C · ${t.fib} Fib`;

  const container = document.getElementById("meal-list");
  container.innerHTML = "";

  data.meals.forEach((meal, idx) => {
    const checked = isMealChecked(day, idx);
    const card = document.createElement("div");
    card.className = "meal-card" + (checked ? " eaten" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "meal-checkbox";
    checkbox.checked = checked;
    checkbox.setAttribute("aria-label", `Mark ${meal.name} as eaten`);
    checkbox.addEventListener("change", () => {
      setMealChecked(day, idx, checkbox.checked);
      card.classList.toggle("eaten", checkbox.checked);
    });

    const body = document.createElement("div");
    body.className = "meal-body";
    body.innerHTML = `
      <div class="meal-name">${meal.name}</div>
      <div class="meal-recipe">${meal.recipe}</div>
      <div class="meal-macros">
        <span class="macro-pill">${meal.kcal} kcal</span>
        <span class="macro-pill">${meal.protein} g protein</span>
        <span class="macro-pill">${meal.fat} g fat</span>
        <span class="macro-pill">${meal.carbs} g carbs</span>
        <span class="macro-pill">${meal.fib} g fibre</span>
      </div>
    `;

    card.appendChild(checkbox);
    card.appendChild(body);
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderDayPage);
