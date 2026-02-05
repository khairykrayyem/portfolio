// year
document.getElementById("year").textContent = new Date().getFullYear();

// drawer menu
const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");

burger.addEventListener("click", () => {
  const open = drawer.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
  drawer.setAttribute("aria-hidden", String(!open));
});

document.querySelectorAll(".drawer-link").forEach(a => {
  a.addEventListener("click", () => {
    drawer.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
  });
});

// reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// project filtering
const chips = document.getElementById("chips");
const cards = [...document.querySelectorAll(".project-card")];

chips.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;

  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");

  const filter = btn.dataset.filter;
  cards.forEach(card => {
    const tags = (card.dataset.tags || "").split(",").map(t => t.trim());
    const show = (filter === "all") || tags.includes(filter);
    card.style.display = show ? "" : "none";
  });
});

// modal
document.querySelectorAll("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-modal");
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

document.querySelectorAll(".modal [data-close]").forEach(el => {
  el.addEventListener("click", () => {
    const modal = el.closest(".modal");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.open").forEach(m => {
      m.classList.remove("open");
      m.setAttribute("aria-hidden", "true");
    });
  }
});
