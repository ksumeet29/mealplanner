// Renders the shared header/nav. Call renderNav('active-page-id') from each page.
function renderNav(activeId) {
  const inSrc = window.location.pathname.includes("/src/") || window.location.href.includes("/src/");
  const pageBase = inSrc ? "" : "src/";
  const homeHref = inSrc ? "../index.html" : "index.html";

  const links = [
    { id: "home", href: homeHref, label: "Home" },
    { id: "calculator", href: inSrc ? "../calculator.html" : "calculator.html", label: "⚙️ Calculator" },
    { id: "planner", href: inSrc ? "../planner.html" : "planner.html", label: "🧺 Planner" },
    { id: "Monday", href: `${pageBase}monday.html`, label: "Mon" },
    { id: "Tuesday", href: `${pageBase}tuesday.html`, label: "Tue" },
    { id: "Wednesday", href: `${pageBase}wednesday.html`, label: "Wed" },
    { id: "Thursday", href: `${pageBase}thursday.html`, label: "Thu" },
    { id: "Friday", href: `${pageBase}friday.html`, label: "Fri" },
    { id: "Saturday", href: `${pageBase}saturday.html`, label: "Sat" },
    { id: "Sunday", href: `${pageBase}sunday.html`, label: "Sun" },
    { id: "shopping", href: `${pageBase}shopping.html`, label: "🛒 Shopping List" },
    { id: "tracker", href: `${pageBase}tracker.html`, label: "📊 Weekly Tracker" }
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
