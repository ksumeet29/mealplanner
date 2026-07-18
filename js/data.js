// Meal plan data extracted from docx_output.md
// Macros format: kcal, protein (g), fat (g), carbs (g), fibre (g)

const MEAL_PLAN = {
  Monday: {
    note: "",
    target: { kcal: 2174, protein: 175, fat: 67, carbs: 225, fib: 46 },
    meals: [
      { name: "Breakfast", recipe: "3 eggs + 100 g cottage cheese scramble (onion, tomato, capsicum) + 25 g oats side + 1 tsp honey + ½ banana", kcal: 513, protein: 35.6, fat: 21.2, carbs: 46.0, fib: 6.8 },
      { name: "Snack 1", recipe: "Whey shake: 1 scoop + 250 ml milk", kcal: 270, protein: 32.2, fat: 9.5, carbs: 14.8, fib: 0 },
      { name: "Lunch", recipe: "Rajma curry (50 g raw) + 1 roti + 100 g cottage cheese cubes + cauliflower-carrot sabzi + 1 tsp oil", kcal: 478, protein: 30.3, fat: 9.9, carbs: 68.0, fib: 19.3 },
      { name: "Snack 2", recipe: "Whey-cottage smoothie: 150 g cottage cheese + 1 scoop whey + ½ apple + cinnamon", kcal: 310, protein: 42.2, fat: 8.2, carbs: 18.5, fib: 2.0 },
      { name: "Dinner", recipe: "Chana masala (50 g raw chickpeas) + 1 roti + peas-corn sabzi + 100 g cottage cheese + 15 g cheese + 1 tsp oil", kcal: 604, protein: 34.8, fat: 18.1, carbs: 77.5, fib: 17.5 }
    ]
  },
  Tuesday: {
    note: "",
    target: { kcal: 2158, protein: 151, fat: 67, carbs: 247, fib: 48 },
    meals: [
      { name: "Breakfast", recipe: "3-egg omelette + 15 g cheese + veg + oats porridge (25 g oats in 150 ml milk) + 1 tsp honey", kcal: 513, protein: 31.8, fat: 26.6, carbs: 37.5, fib: 5.3 },
      { name: "Snack 1", recipe: "Whey shake: 1 scoop + 200 ml milk + ½ banana", kcal: 292, protein: 31.2, fat: 8.2, carbs: 25.9, fib: 1.5 },
      { name: "Lunch", recipe: "Bulgur-chickpea bowl (50 g bulgur + 50 g chickpeas, both raw) + peas-corn-capsicum + 100 g cottage cheese + 1 tsp oil", kcal: 582, protein: 32.5, fat: 13.2, carbs: 86.5, fib: 22.5 },
      { name: "Snack 2", recipe: "200 g cottage cheese + 1 apple + cinnamon", kcal: 285, protein: 24.5, fat: 8.3, carbs: 29.0, fib: 4.0 },
      { name: "Dinner", recipe: "Masoor dal (50 g raw pulses) + 1 roti + beetroot-carrot sabzi + 100 g cottage cheese side + 1 tsp oil", kcal: 485, protein: 30.8, fat: 10.2, carbs: 68.0, fib: 14.3 }
    ]
  },
  Wednesday: {
    note: "prep day",
    target: { kcal: 1994, protein: 168, fat: 70, carbs: 178, fib: 31 },
    meals: [
      { name: "Breakfast", recipe: "4-egg scramble + 100 g cottage cheese + capsicum-onion-tomato + 1 tsp oil", kcal: 458, protein: 37.8, fat: 28.8, carbs: 11.0, fib: 2.8 },
      { name: "Snack 1", recipe: "Whey shake: 1 scoop + 250 ml milk", kcal: 270, protein: 32.2, fat: 9.5, carbs: 14.8, fib: 0 },
      { name: "Lunch", recipe: "Veg pasta: 60 g raw pasta + tomato-veg sauce + 150 g cottage cheese stirred in + 15 g cheese", kcal: 474, protein: 32.2, fat: 12.3, carbs: 58.5, fib: 6.0 },
      { name: "Snack 2", recipe: "Mango-whey smoothie: 150 g cottage cheese + 1 scoop whey + ½ mango", kcal: 352, protein: 43.2, fat: 8.6, carbs: 28.0, fib: 2.5 },
      { name: "Dinner", recipe: "Rajma (50 g raw) + 1 roti + carrot-beetroot sabzi + 15 g cheese melted on top + 1 tsp oil", kcal: 440, protein: 22.1, fat: 10.9, carbs: 66.0, fib: 19.3 }
    ]
  },
  Thursday: {
    note: "",
    target: { kcal: 2220, protein: 157, fat: 68, carbs: 251, fib: 51 },
    meals: [
      { name: "Breakfast", recipe: "3 eggs + 100 g cottage cheese scramble + 1 roti + veg", kcal: 486, protein: 36.3, fat: 19.9, carbs: 39.5, fib: 6.8 },
      { name: "Snack 1", recipe: "Whey shake: 1 scoop + 250 ml milk + ½ apple", kcal: 317, protein: 32.5, fat: 9.7, carbs: 27.2, fib: 2.0 },
      { name: "Lunch", recipe: "Bulgur-chickpea pilaf (50 g bulgur + 50 g chickpeas raw) + peas-corn-carrot + 100 g cottage cheese + 1 tsp oil", kcal: 582, protein: 32.5, fat: 13.2, carbs: 86.5, fib: 22.5 },
      { name: "Snack 2", recipe: "200 g cottage cheese + 1 apple", kcal: 285, protein: 24.5, fat: 8.3, carbs: 29.0, fib: 4.0 },
      { name: "Dinner", recipe: "Chana masala (50 g raw chickpeas) + 1 roti + cauliflower sabzi + 100 g cottage cheese + 15 g cheese + 1 tsp oil", kcal: 550, protein: 31.6, fat: 17.4, carbs: 68.5, fib: 15.3 }
    ]
  },
  Friday: {
    note: "",
    target: { kcal: 2206, protein: 170, fat: 64, carbs: 248, fib: 50 },
    meals: [
      { name: "Breakfast", recipe: "Whey-oats porridge: 40 g oats + 200 ml milk + 1 scoop whey stirred in + ½ banana + 1 tsp honey", kcal: 464, protein: 36.4, fat: 11.0, carbs: 57.8, fib: 5.5 },
      { name: "Snack 1", recipe: "Savory cottage-cheese plate: 200 g cottage cheese + 15 g cheese + capsicum-cucumber sticks", kcal: 264, protein: 28.6, fat: 13.2, carbs: 7.5, fib: 1.4 },
      { name: "Lunch", recipe: "Dal (50 g raw pulses) + 1 roti + veg + 100 g cottage cheese + 100 g Turkish yoghurt raita + 1 tsp oil", kcal: 615, protein: 36.8, fat: 20.1, carbs: 72.0, fib: 14.3 },
      { name: "Snack 2", recipe: "Mango-whey smoothie: 150 g cottage cheese + 1 scoop whey + ½ mango", kcal: 352, protein: 43.2, fat: 8.6, carbs: 28.0, fib: 2.5 },
      { name: "Dinner", recipe: "Rajma-bulgur bowl (50 g raw rajma + 60 g raw bulgur) + veg + 15 g cheese + 1 tsp oil", kcal: 510, protein: 24.8, fat: 11.2, carbs: 82.6, fib: 26.1 }
    ]
  },
  Saturday: {
    note: "",
    target: { kcal: 2182, protein: 159, fat: 65, carbs: 247, fib: 54 },
    meals: [
      { name: "Breakfast", recipe: "3-egg + 100 g cottage cheese scramble + 1 roti + veg + ½ banana", kcal: 538, protein: 36.9, fat: 20.1, carbs: 53.0, fib: 8.3 },
      { name: "Snack 1", recipe: "Whey shake: 1 scoop + 200 ml milk", kcal: 240, protein: 30.6, fat: 8.0, carbs: 12.4, fib: 0 },
      { name: "Lunch", recipe: "Power bowl: 60 g raw chickpeas + 40 g raw bulgur + corn-capsicum + 100 g cottage cheese + 15 g cheese + lemon-oil dressing", kcal: 641, protein: 37.0, fat: 18.7, carbs: 85.0, fib: 22.4 },
      { name: "Snack 2", recipe: "200 g cottage cheese + 1 apple + cinnamon", kcal: 285, protein: 24.5, fat: 8.3, carbs: 29.0, fib: 4.0 },
      { name: "Dinner", recipe: "Rajma curry (50 g raw) + 1 roti + carrot-beetroot sabzi + 100 g cottage cheese + 1 tsp oil", kcal: 478, protein: 30.3, fat: 9.9, carbs: 68.0, fib: 19.3 }
    ]
  },
  Sunday: {
    note: "prep day",
    target: { kcal: 2083, protein: 170, fat: 66, carbs: 208, fib: 35 },
    meals: [
      { name: "Breakfast", recipe: "4-egg omelette + 15 g cheese + veg + 1 roti", kcal: 520, protein: 34.0, fat: 25.9, carbs: 38.0, fib: 6.8 },
      { name: "Snack 1", recipe: "Whey shake: 1 scoop + 250 ml milk + ½ mango", kcal: 360, protein: 33.5, fat: 10.1, carbs: 36.8, fib: 2.5 },
      { name: "Lunch", recipe: "Veg pasta: 60 g raw pasta + tomato-veg sauce + 150 g cottage cheese + 15 g cheese", kcal: 474, protein: 32.2, fat: 12.3, carbs: 58.5, fib: 6.0 },
      { name: "Snack 2", recipe: "Whey-cottage smoothie: 150 g cottage cheese + 1 scoop whey + cinnamon", kcal: 262, protein: 42.0, fat: 8.0, carbs: 6.0, fib: 0 },
      { name: "Dinner", recipe: "Rajma + sweet potato bowl: 50 g raw rajma + 150 g sweet potato + 100 g cottage cheese + veg + 1 tsp oil", kcal: 466, protein: 28.2, fat: 9.4, carbs: 69.0, fib: 19.8 }
    ]
  }
};

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const OVERALL_TARGET = { kcal: 2107, protein: 166.6, fat: 71.4, carbs: 199.5, fib: null };

// Shopping list — aggregated approximate weekly quantities derived from the
// meal plan + Sunday/Wednesday prep sessions. Adjust to taste/brand sizes.
const SHOPPING_LIST = {
  "Proteins": [
    { item: "Eggs", qty: "36 (20 fresh for breakfasts + 16 hard-boiled for snacks)" },
    { item: "Whey protein powder", qty: "~14 scoops" },
    { item: "Cottage cheese (paneer)", qty: "~2.8 kg" },
    { item: "Cheese (grated/sliced)", qty: "~150 g" },
    { item: "Milk", qty: "~2 L (shakes, porridge, smoothies)" },
    { item: "Turkish yoghurt", qty: "100 g" }
  ],
  "Legumes & Grains": [
    { item: "Dry chickpeas (chana/rajma-style raw)", qty: "~400 g (soaking + refill)" },
    { item: "Dry rajma (kidney beans)", qty: "~250 g" },
    { item: "Masoor/moong dal (pulses)", qty: "~200 g" },
    { item: "Bulgur wheat", qty: "~450 g" },
    { item: "Rolled oats", qty: "~90 g" },
    { item: "Whole wheat flour (atta)", qty: "~900 g" },
    { item: "Pasta (dry)", qty: "~120 g" },
    { item: "Sweet potato", qty: "150 g" }
  ],
  "Vegetables": [
    { item: "Onions", qty: "~8 medium" },
    { item: "Tomatoes", qty: "~10 medium" },
    { item: "Capsicum", qty: "~5" },
    { item: "Carrots", qty: "~5" },
    { item: "Beetroot", qty: "~4" },
    { item: "Cauliflower", qty: "~2" },
    { item: "Frozen peas & corn", qty: "~300 g" },
    { item: "Cucumber", qty: "1-2 (snack sticks)" },
    { item: "Garlic", qty: "1 bulb" },
    { item: "Ginger", qty: "2 inch piece" }
  ],
  "Fruits": [
    { item: "Bananas", qty: "~4" },
    { item: "Apples", qty: "~5" },
    { item: "Mango (fresh/frozen pulp)", qty: "~3" }
  ],
  "Pantry & Spices": [
    { item: "Cooking oil", qty: "~15 tsp (~75 ml)" },
    { item: "Honey", qty: "3 tsp" },
    { item: "Cinnamon powder", qty: "small jar" },
    { item: "Turmeric, red chili, coriander powder, garam masala", qty: "as needed" },
    { item: "Salt", qty: "as needed" },
    { item: "Lemon", qty: "2-3" }
  ]
};
