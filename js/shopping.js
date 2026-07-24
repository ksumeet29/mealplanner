// Renders the shopping list with persistent checkboxes.

const FREQUENCY_NOTES = {
  "Weekly": "Perishables to restock every week — fresh produce, eggs & dairy.",
  "Bi-Weekly": "Semi-perishables that keep 2-3 weeks — restock every other week.",
  "Monthly": "Shelf-stable pantry staples usually bought in bulk once a month."
};

function renderShoppingList() {
  const container = document.getElementById("shopping-list");
  container.innerHTML = "";
  const state = loadShopState();

  Object.entries(getActiveShoppingList()).forEach(([frequency, categories]) => {
    const freqSection = document.createElement("section");
    freqSection.className = "frequency-group";

    const freqHeading = document.createElement("h2");
    freqHeading.className = "frequency-title";
    freqHeading.textContent = frequency;
    freqSection.appendChild(freqHeading);

    const freqNote = document.createElement("p");
    freqNote.className = "frequency-note";
    freqNote.textContent = FREQUENCY_NOTES[frequency] || "";
    freqSection.appendChild(freqNote);

    Object.entries(categories).forEach(([category, items]) => {
      const section = document.createElement("section");
      section.className = "category";
      const heading = document.createElement("h3");
      heading.textContent = category;
      section.appendChild(heading);

      items.forEach((entry, idx) => {
        const key = `${frequency}::${category}::${idx}`;
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

      freqSection.appendChild(section);
    });

    container.appendChild(freqSection);
  });
}

function resetShoppingList() {
  if (confirm("Uncheck all shopping list items?")) {
    saveShopState({});
    renderShoppingList();
  }
}

document.addEventListener("DOMContentLoaded", renderShoppingList);
