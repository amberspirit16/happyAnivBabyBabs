/* =========================================================
   Our First Anniversary — surprise.js
   ========================================================= */

/* ✏️ EDIT THESE THREE THINGS ------------------------------ */
const CONFIG = {
  herName: "baby babs",                 // her name or nickname (shows up in a few places)
  startDate: "2025-10-15T00:00:00",   // the day you became a couple (local time)
  loveReplies: [                      // shown one by one when she taps the final button
    "I love you baby babs!!!",
    "I love you more.",
    "Always and forever.",
    "You're my favorite person.",
    "Here's to year two 🥂"
  ]
};
/* --------------------------------------------------------- */

document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Her name ---------- */
document.querySelectorAll("[data-her]").forEach(el => { el.textContent = CONFIG.herName; });

/* ---------- Live counter ---------- */
(function counter() {
  const start = new Date(CONFIG.startDate).getTime();
  const $ = id => document.getElementById(id);
  const els = { d: $("c-days"), h: $("c-hours"), m: $("c-mins"), s: $("c-secs") };

  function tick() {
    let diff = Math.max(0, Date.now() - start);
    const d = Math.floor(diff / 86400000); diff -= d * 86400000;
    const h = Math.floor(diff / 3600000);  diff -= h * 3600000;
    const m = Math.floor(diff / 60000);    diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    els.d.textContent = d.toLocaleString();
    els.h.textContent = h;
    els.m.textContent = m;
    els.s.textContent = s;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ---------- Falling petals (hero) ---------- */
(function petals() {
  if (reduceMotion) return;
  const canvas = document.getElementById("petals");
  const ctx = canvas.getContext("2d");
  const hero = document.getElementById("welcome");
  const colors = ["#ff9db6", "#ffb7c9", "#e8517a", "#cdb8f5", "#ffd1dc"];
  let w, h, dpr, list = [], running = true;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(46, Math.max(18, w / 24)));
    list = Array.from({ length: count }, () => make(true));
  }

  function make(anywhere) {
    return {
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -20,
      size: 6 + Math.random() * 10,
      speed: 0.4 + Math.random() * 0.9,
      sway: 0.5 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.03,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.5 + Math.random() * 0.45
    };
  }

  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of list) {
      p.y += p.speed;
      p.phase += 0.015;
      p.x += Math.sin(p.phase) * p.sway;
      p.rot += p.spin;
      if (p.y > h + 20) Object.assign(p, make(false), { x: Math.random() * w });

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(draw);
  }

  // Pause when the hero is off-screen to save battery
  new IntersectionObserver(([entry]) => {
    const was = running;
    running = entry.isIntersecting;
    if (running && !was) requestAnimationFrame(draw);
  }).observe(hero);

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
})();

/* ---------- Envelope & letter ---------- */
(function envelope() {
  const btn = document.getElementById("envelope");
  const wrap = document.getElementById("letter-wrap");
  const label = document.getElementById("env-label");

  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    wrap.classList.toggle("open", !open);
    label.textContent = open ? "Open" : "Close";
    if (!open) {
      burstHearts(10);
      setTimeout(() => wrap.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }), 450);
    }
  });
})();

/* ---------- Timeline reveal ---------- */
(function timeline() {
  const items = document.querySelectorAll(".tl-item");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    items.forEach(i => i.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  items.forEach(i => io.observe(i));
})();

/* ---------- Gallery viewer ---------- */
(function gallery() {
  const box = document.getElementById("lightbox");
  const frame = document.getElementById("lbFrame");
  const cap = document.getElementById("lbCaption");

  function open(shot) {
    const media = shot.querySelector("img, .photo").cloneNode(true);
    frame.replaceChildren(media);
    cap.textContent = shot.querySelector("figcaption").textContent;
    box.showModal();
  }

  document.querySelectorAll(".shot").forEach(shot => {
    shot.addEventListener("click", () => open(shot));
    shot.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(shot); }
    });
  });

  document.getElementById("lbClose").addEventListener("click", () => box.close());
  // Click on the dark backdrop closes it too
  box.addEventListener("click", e => { if (e.target === box) box.close(); });
})();

/* ---------- Hearts ---------- */
function burstHearts(n = 24) {
  if (reduceMotion) return;
  const icons = ["💗", "💖", "💕", "❤️", "💞", "🌸"];
  for (let i = 0; i < n; i++) {
    const el = document.createElement("span");
    el.className = "float-heart";
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = 18 + Math.random() * 22 + "px";
    el.style.setProperty("--dur", 2.6 + Math.random() * 2.4 + "s");
    el.style.setProperty("--dx", (Math.random() - 0.5) * 120 + "px");
    el.style.setProperty("--s", 0.8 + Math.random() * 0.8);
    el.style.animationDelay = Math.random() * 0.6 + "s";
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

/* ---------- Final button ---------- */
(function finale() {
  const btn = document.getElementById("loveBtn");
  const reply = document.getElementById("loveReply");
  let n = 0;
  btn.addEventListener("click", () => {
    reply.textContent = CONFIG.loveReplies[n % CONFIG.loveReplies.length];
    n++;
    burstHearts(28);
    if (navigator.vibrate) navigator.vibrate(40);
  });
})();
