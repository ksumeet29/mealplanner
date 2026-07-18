// Renders the shared header/nav. Call renderNav('active-page-id') from each page.
function renderNav(activeId) {
  const links = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "Monday", href: "monday.html", label: "Mon" },
    { id: "Tuesday", href: "tuesday.html", label: "Tue" },
    { id: "Wednesday", href: "wednesday.html", label: "Wed" },
    { id: "Thursday", href: "thursday.html", label: "Thu" },
    { id: "Friday", href: "friday.html", label: "Fri" },
    { id: "Saturday", href: "saturday.html", label: "Sat" },
    { id: "Sunday", href: "sunday.html", label: "Sun" },
    { id: "shopping", href: "shopping.html", label: "🛒 Shopping List" },
    { id: "tracker", href: "tracker.html", label: "📊 Weekly Tracker" }
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
