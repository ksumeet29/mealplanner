// Renders the shared header/nav. Call renderNav('active-page-id') from each page.
function renderNav(activeId) {
  const links = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "Monday", href: "src/monday.html", label: "Mon" },
    { id: "Tuesday", href: "src/tuesday.html", label: "Tue" },
    { id: "Wednesday", href: "src/wednesday.html", label: "Wed" },
    { id: "Thursday", href: "src/thursday.html", label: "Thu" },
    { id: "Friday", href: "src/friday.html", label: "Fri" },
    { id: "Saturday", href: "src/saturday.html", label: "Sat" },
    { id: "Sunday", href: "src/sunday.html", label: "Sun" },
    { id: "shopping", href: "src/shopping.html", label: "🛒 Shopping List" },
    { id: "tracker", href: "src/tracker.html", label: "📊 Weekly Tracker" }
  ];
  const nav = document.getElementById("main-nav");
  if (!nav) return;
  nav.innerHTML = links
    .map(
      (l) =>
        `<a href="${l.href}"${l.id === activeId ? ' class="active"' : ""}>${l.label}</a>`
    )
    .join("");
}
