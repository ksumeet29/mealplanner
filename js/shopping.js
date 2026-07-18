// Renders the shopping list with persistent checkboxes.

function renderShoppingList() {
  const container = document.getElementById("shopping-list");
  container.innerHTML = "";
  const state = loadShopState();

  Object.entries(SHOPPING_LIST).forEach(([category, items]) => {
    const section = document.createElement("section");
    section.className = "category";
    const heading = document.createElement("h3");
    heading.textContent = category;
    section.appendChild(heading);

    items.forEach((entry, idx) => {
      const key = `${category}::${idx}`;
      const checked = !!state[key];

      const row = document.createElement("div");
      row.className = "shop-item" + (checked ? " checked" : "");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "shop-" + key.replace(/\s+/g, "_");
      checkbox.checked = checked;
      checkbox.addEventListener("change", () => {
        const s = loadShopState();
        s[key] = checkbox.checked;
        saveShopState(s);
        row.classList.toggle("checked", checkbox.checked);
      });

      const label = document.createElement("label");
      label.setAttribute("for", checkbox.id);
      label.textContent = `${entry.item} — ${entry.qty}`;

      row.appendChild(checkbox);
      row.appendChild(label);
      section.appendChild(row);
    });

    container.appendChild(section);
  });
}

function resetShoppingList() {
  if (confirm("Uncheck all shopping list items?")) {
    saveShopState({});
    renderShoppingList();
  }
}

document.addEventListener("DOMContentLoaded", renderShoppingList);
