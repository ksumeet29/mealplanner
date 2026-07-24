// Ingredient database: macro values are per 100 g (or 100 ml for liquids),
// following standard nutrition-label convention so the meal engine can scale
// portions freely. Each ingredient is tagged with a primary "category" that
// mealEngine.js uses to decide what role it plays when building a meal:
//   protein -> primary protein source for the meal
//   carb    -> primary carbohydrate source for the meal
//   fat     -> concentrated fat source (oils, nuts, cheese)
//   veg     -> low-calorie filler for fibre/micronutrients (fixed portion)
const FOOD_DATABASE = [
  // Protein sources
  { id: "eggs", name: "Eggs", category: "protein", kcal: 155, protein: 13, fat: 11, carbs: 1.1, fib: 0 },
  { id: "chicken_breast", name: "Chicken Breast", category: "protein", kcal: 165, protein: 31, fat: 3.6, carbs: 0, fib: 0 },
  { id: "paneer", name: "Cottage Cheese (Paneer)", category: "protein", kcal: 265, protein: 18, fat: 20, carbs: 6, fib: 0 },
  { id: "whey", name: "Whey Protein Powder", category: "protein", kcal: 400, protein: 80, fat: 7, carbs: 8, fib: 2 },
  { id: "greek_yogurt", name: "Greek Yogurt", category: "protein", kcal: 59, protein: 10, fat: 0.4, carbs: 3.6, fib: 0 },
  { id: "tofu", name: "Tofu", category: "protein", kcal: 144, protein: 17, fat: 8, carbs: 3, fib: 2 },
  { id: "fish", name: "Fish (Salmon/Rohu)", category: "protein", kcal: 208, protein: 20, fat: 13, carbs: 0, fib: 0 },
  { id: "chickpeas", name: "Chickpeas (cooked)", category: "protein", kcal: 164, protein: 8.9, fat: 2.6, carbs: 27, fib: 7.6 },
  { id: "rajma", name: "Rajma / Kidney Beans (cooked)", category: "protein", kcal: 127, protein: 8.7, fat: 0.5, carbs: 22.8, fib: 6.4 },
  { id: "dal", name: "Dal / Lentils (cooked)", category: "protein", kcal: 116, protein: 9, fat: 0.4, carbs: 20, fib: 8 },
  { id: "mutton", name: "Mutton (cooked)", category: "protein", kcal: 143, protein: 27, fat: 3, carbs: 0, fib: 0 },
  { id: "chicken_thigh", name: "Chicken Thigh (cooked)", category: "protein", kcal: 209, protein: 26, fat: 10.9, carbs: 0, fib: 0 },
  { id: "milk", name: "Milk", category: "protein", kcal: 61, protein: 3.2, fat: 3.3, carbs: 4.8, fib: 0 },

  // Carbohydrate sources
  { id: "rice", name: "Rice (cooked)", category: "carb", kcal: 130, protein: 2.7, fat: 0.3, carbs: 28, fib: 0.4 },
  { id: "roti_atta", name: "Whole Wheat Flour / Roti", category: "carb", kcal: 340, protein: 12, fat: 1.5, carbs: 72, fib: 11 },
  { id: "oats", name: "Rolled Oats", category: "carb", kcal: 389, protein: 17, fat: 7, carbs: 66, fib: 10 },
  { id: "sweet_potato", name: "Sweet Potato (cooked)", category: "carb", kcal: 90, protein: 2, fat: 0.1, carbs: 21, fib: 3.3 },
  { id: "bulgur", name: "Bulgur Wheat (cooked)", category: "carb", kcal: 83, protein: 3.1, fat: 0.2, carbs: 19, fib: 4.5 },
  { id: "pasta", name: "Pasta (cooked)", category: "carb", kcal: 131, protein: 5, fat: 1.1, carbs: 25, fib: 1.8 },
  { id: "banana", name: "Banana", category: "carb", kcal: 89, protein: 1.1, fat: 0.3, carbs: 22.8, fib: 2.6 },
  { id: "apple", name: "Apple", category: "carb", kcal: 52, protein: 0.3, fat: 0.2, carbs: 13.8, fib: 2.4 },
  { id: "orange", name: "Orange", category: "carb", kcal: 47, protein: 0.9, fat: 0.1, carbs: 11.8, fib: 2.4 },
  { id: "clementine", name: "Clementine", category: "carb", kcal: 47, protein: 0.85, fat: 0.15, carbs: 12, fib: 1.7 },
  { id: "watermelon", name: "Watermelon", category: "carb", kcal: 30, protein: 0.6, fat: 0.15, carbs: 7.6, fib: 0.4 },
  { id: "grapes", name: "Grapes", category: "carb", kcal: 69, protein: 0.72, fat: 0.16, carbs: 18.1, fib: 0.9 },
  { id: "pear", name: "Pear", category: "carb", kcal: 57, protein: 0.36, fat: 0.14, carbs: 15.2, fib: 3.1 },
  { id: "blueberry", name: "Blueberry", category: "carb", kcal: 57, protein: 0.74, fat: 0.33, carbs: 14.5, fib: 2.4 },
  { id: "raspberry", name: "Raspberry", category: "carb", kcal: 52, protein: 1.2, fat: 0.65, carbs: 11.9, fib: 6.5 },
  { id: "strawberry", name: "Strawberry", category: "carb", kcal: 32, protein: 0.67, fat: 0.3, carbs: 7.7, fib: 2 },

  // Fat sources
  { id: "cooking_oil", name: "Cooking Oil", category: "fat", kcal: 884, protein: 0, fat: 100, carbs: 0, fib: 0 },
  { id: "peanut_butter", name: "Peanut Butter", category: "fat", kcal: 588, protein: 25, fat: 50, carbs: 20, fib: 6 },
  { id: "almonds", name: "Almonds", category: "fat", kcal: 579, protein: 21, fat: 50, carbs: 22, fib: 12.5 },
  { id: "cheese", name: "Cheese (cheddar)", category: "fat", kcal: 402, protein: 25, fat: 33, carbs: 1.3, fib: 0 },
  { id: "avocado", name: "Avocado", category: "fat", kcal: 160, protein: 2, fat: 15, carbs: 8.5, fib: 6.7 },
  { id: "butter", name: "Butter", category: "fat", kcal: 717, protein: 0.9, fat: 81, carbs: 0.1, fib: 0 },

  // Vegetables (fibre/micronutrient filler, fixed portion per meal)
  { id: "spinach", name: "Spinach", category: "veg", kcal: 23, protein: 2.9, fat: 0.4, carbs: 3.6, fib: 2.2 },
  { id: "broccoli", name: "Broccoli", category: "veg", kcal: 34, protein: 2.8, fat: 0.4, carbs: 7, fib: 2.6 },
  { id: "mixed_veg", name: "Mixed Vegetables (onion/tomato/capsicum/carrot)", category: "veg", kcal: 30, protein: 1.3, fat: 0.2, carbs: 6, fib: 2.5 },
  { id: "cucumber", name: "Cucumber", category: "veg", kcal: 15, protein: 0.7, fat: 0.1, carbs: 3.6, fib: 0.5 },
  { id: "cauliflower", name: "Cauliflower", category: "veg", kcal: 25, protein: 1.9, fat: 0.3, carbs: 5, fib: 2 },
  { id: "cabbage", name: "Cabbage", category: "veg", kcal: 25, protein: 1.3, fat: 0.1, carbs: 5.8, fib: 2.5 },
  { id: "mushroom", name: "Mushroom", category: "veg", kcal: 22, protein: 3.1, fat: 0.3, carbs: 3.3, fib: 1 },
  { id: "potato", name: "Potato (boiled)", category: "veg", kcal: 87, protein: 1.9, fat: 0.1, carbs: 20.1, fib: 1.8 },
  { id: "beet", name: "Beet (cooked)", category: "veg", kcal: 44, protein: 1.7, fat: 0.2, carbs: 10, fib: 2 }
];

const FOOD_CATEGORY_LABELS = {
  protein: "Protein sources",
  carb: "Carb sources",
  fat: "Fat sources",
  veg: "Vegetables"
};

function getFoodById(id) {
  return FOOD_DATABASE.find((f) => f.id === id);
}

function groupFoodsByCategory(ids) {
  const byCategory = { protein: [], carb: [], fat: [], veg: [] };
  ids.forEach((id) => {
    const item = getFoodById(id);
    if (item) byCategory[item.category].push(item);
  });
  return byCategory;
}
