# 🍽️ Fitness Meal Planner

A single static website that takes you from **physical stats → calculated
macros → a personalized 7-day meal plan → daily tracking & shopping list**.

- No login, no accounts, no backend server.
- No AI/LLM calls — macro math and meal generation are both plain,
  deterministic JavaScript running in your browser.
- All your data (profile, macros, ingredient choices, generated plan, eaten
  meals, shopping checklist) is stored locally via `localStorage`. Nothing is
  sent to a server. Clearing your browser data clears your plan.

---

## How it works — the 3-step flow

### Step 1 — Calculator (`calculator.html`)
Enter weight, height, age, sex, body fat %, training days, goal (fat loss /
maintenance / muscle gain) and activity level.

`js/macroEngine.js` computes, entirely client-side:
- **BMR** via three formulas: Mifflin-St Jeor, Harris-Benedict, Katch-McArdle
  (this logic is a direct JS port of the original C++ `macros_calculator`
  core — same formulas, same results).
- **TDEE** = BMR (your selected method) × activity multiplier.
- **Daily macros**: protein/fat grams per kg bodyweight (varies by goal),
  remaining calories filled with carbs. If your goal is fat loss, your
  chosen calorie deficit is subtracted first.

Results (BMR by all 3 methods, TDEE, target calories, protein/fat/carbs) are
displayed immediately and saved to `localStorage` so you don't have to
recalculate every visit. Instead of a separate method dropdown, the three BMR
result cards themselves are clickable — click Mifflin-St Jeor, Harris-Benedict
or Katch-McArdle to select it as your TDEE method, and TDEE/macros recalculate
instantly with the selected card highlighted.

### Step 2 — Planner (`planner.html`)
Shows your saved macro targets, then lets you check off which ingredients you
actually eat/have on hand from `js/foodDatabase.js` — organized into four
roles:
- **Protein sources** (eggs, chicken breast/thigh, mutton, paneer, whey,
  greek yogurt, tofu, fish, chickpeas, rajma, lentils, milk, …)
- **Carb sources** (rice, roti/atta, oats, sweet potato, bulgur, pasta,
  banana, apple, orange, clementine, watermelon, grapes, pear, blueberry,
  raspberry, strawberry, …)
- **Fat sources** (cooking oil, peanut butter, almonds, cheese, avocado,
  butter)
- **Vegetables** (spinach, broccoli, mixed veg, cucumber, cauliflower,
  cabbage, mushroom, potato, beet — fibre/micronutrients)

Clicking **Generate 7-Day Plan** runs `js/mealEngine.js`:
1. Splits your daily targets across 5 meal slots (Breakfast 25%, Snack 1 10%,
   Lunch 30%, Snack 2 10%, Dinner 25%).
2. For each meal, picks one ingredient per role (rotating through your
   selections across days/slots for variety) and solves portion sizes with
   an iterative balancing pass (Gauss-Seidel style, 4 iterations) so
   cross-contributed macros — e.g. protein from a carb source — aren't
   double-counted.
3. Portions are clamped to realistic ranges (e.g. 20–300 g for staples,
   3–40 g for oils/nuts) so results stay practical.
4. Repeats for all 7 days, and tallies total grams used per ingredient across
   the week to build a shopping list automatically.

If a required role (e.g. no fat source) wasn't selected, a warning is shown
so the plan can still be generated but flagged as incomplete.

Typical accuracy: generated daily totals land within roughly ±5–10% of your
calculated macro targets. This is a heuristic solver, not an exact optimizer —
good enough for real-world meal planning without needing a backend or AI.

### Step 3 — Live with the plan
- **Day pages** (`src/monday.html` … `src/sunday.html`) show that day's
  meals with checkboxes to mark what you've eaten.
- **Weekly Tracker** (`src/tracker.html`) shows consumed vs. target macros
  per day and for the week, with progress bars.
- **Shopping List** (`src/shopping.html`) shows aggregated ingredient
  quantities for the week with checkboxes, grouped by role.

All three automatically use your generated plan if one exists
(`js/state.js` handles the fallback logic); otherwise they fall back to a
bundled demo plan (`js/data.js`) so the site is useful even before you've
run the calculator — nothing renders blank on first visit.

---

## Data & storage

Everything lives in `localStorage` under these keys (see `js/storage.js`):

| Key | Contents |
|---|---|
| `mealplanner_profile_v1` | Your last entered physical stats |
| `mealplanner_macros_v1` | Your last calculated macro targets |
| `mealplanner_selected_ingredients_v1` | Ingredients checked in the Planner |
| `mealplanner_generated_plan_v1` | The generated 7-day meal plan |
| `mealplanner_generated_shopping_v1` | The generated shopping list |
| `mealplanner_meal_state_v1` | Which meals you've checked off as eaten |
| `mealplanner_shopping_state_v1` | Which shopping list items you've checked off |

Recalculating your macros clears the previously generated plan (since it was
built for different targets) — you'll be prompted to regenerate it.

---

## Project structure

```
mealplanner/
├── index.html            # landing page — step progress + day navigation
├── calculator.html        # Step 1: physical params -> macros
├── planner.html            # Step 2: ingredient picker -> generated plan
├── render.yaml             # Render static-site hosting config
├── css/style.css
├── js/
│   ├── macroEngine.js      # BMR/TDEE/macro math (JS port of macros_calculator's C++ core)
│   ├── foodDatabase.js     # ingredient nutrition data, tagged by role
│   ├── mealEngine.js       # builds the 7-day plan + shopping list from macros + ingredients
│   ├── state.js            # active-plan/shopping-list fallback logic
│   ├── storage.js          # localStorage read/write helpers
│   ├── data.js              # bundled demo meal plan + shopping list (fallback)
│   ├── day.js               # renders a single day's meals with checkboxes
│   ├── tracker.js           # renders the weekly macro tracker
│   ├── shopping.js          # renders the shopping list
│   └── nav.js                # shared header navigation
└── src/
    ├── monday.html … sunday.html   # one page per day
    ├── tracker.html
    └── shopping.html
```

---

## Running locally

No build step or dependencies — it's plain HTML/CSS/JS. Serve the folder
with any static file server, e.g.:

```bash
cd mealplanner
python3 -m http.server 8000
# then open http://localhost:8000
```

## Hosting

Deployed as a **Render static site** — see `render.yaml`. No server process
or database is required; it's just static files served over HTTPS.
