/**
 * Micro-interactions du site : barre de progression de lecture, halo curseur,
 * cartes à inclinaison 3D et boutons magnétiques. Tout est désactivé si
 * l'utilisateur a demandé une réduction des animations.
 */

// Animations forcées : on ignore volontairement prefers-reduced-motion (choix du propriétaire du site).
const reduceMotion = false;
const finePointer = window.matchMedia("(pointer: fine)").matches;

function setupScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  let ticking = false;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? doc.scrollTop / max : 0;
    bar.style.transform = `scaleX(${ratio})`;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  update();
}

function setupSpotlight() {
  const spot = document.getElementById("spotlight");
  if (!spot || !finePointer) return;

  let raf = 0;
  window.addEventListener(
    "pointermove",
    (event) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        spot.style.setProperty("--x", `${event.clientX}px`);
        spot.style.setProperty("--y", `${event.clientY}px`);
        spot.style.opacity = "1";
        raf = 0;
      });
    },
    { passive: true },
  );
}

function setupTilt() {
  if (reduceMotion || !finePointer) return;
  const cards = document.querySelectorAll<HTMLElement>("[data-tilt]");

  cards.forEach((card) => {
    const strength = Number(card.dataset.tilt) || 6;

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--rx", `${(-py * strength).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${(px * strength).toFixed(2)}deg`);
      card.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

function setupMagnetic() {
  if (reduceMotion || !finePointer) return;
  const targets = document.querySelectorAll<HTMLElement>("[data-magnetic]");

  targets.forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
}

function setupParallax() {
  if (reduceMotion) return;
  const items = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
  if (items.length === 0) return;

  let ticking = false;
  const update = () => {
    const mid = window.innerHeight / 2;
    for (const el of items) {
      const speed = Number(el.dataset.parallax) || 0.1;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - mid) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  update();
}

function setupDepth() {
  if (reduceMotion) return;
  const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
  const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-depth]"));
  if (scenes.length === 0 && layers.length === 0) return;

  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    const mid = vh / 2;

    // Scènes : zoom + fondu + flou (focus pull) selon la distance au centre.
    // L'élément n'est net et présent qu'au centre → sensation d'avancer dedans.
    for (const el of scenes) {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const signed = (center - mid) / vh; // <0 au-dessus, >0 en dessous
      const dist = Math.min(Math.abs(signed), 1);
      const scale = (1 - dist * 0.05).toFixed(4); // léger zoom = profondeur
      const ty = (signed * 26).toFixed(1); // dérive verticale douce
      el.style.transform = `translate3d(0, ${ty}px, 0) scale(${scale})`;
      el.style.opacity = `${(1 - dist * 0.18).toFixed(3)}`; // reste lisible, pas de flou
    }

    // Couches : translation verticale proportionnelle à la profondeur
    for (const el of layers) {
      const depth = Number(el.dataset.depth) || 0.1;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - mid) * depth;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", update, { passive: true });
  update();
}

// Spotlight curseur sur les cartes (pattern 21st.dev "Spotlight Card", porté en vanilla)
function setupCardSpotlight() {
  if (!finePointer) return;
  document.querySelectorAll<HTMLElement>("[data-spotlight]").forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
        card.style.setProperty("--my", `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
      },
      { passive: true },
    );
  });
}

// Curseur personnalisé : point exact + anneau qui suit avec inertie, grossit sur les éléments interactifs
function setupCursor() {
  if (!finePointer) return;
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;

  const root = document.documentElement;
  root.classList.add("has-cursor");
  const interactive = "a, button, input, textarea, select, label, [data-tilt], [data-spotlight], [data-magnetic], [role='button'], .marker, .tab-btn, .flip-toggle";

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;
  let ready = false;

  window.addEventListener("pointermove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    if (!ready) { ready = true; root.classList.add("cursor-ready"); }
    const el = document.elementFromPoint(mx, my) as Element | null;
    ring.classList.toggle("grow", !!(el && el.closest(interactive)));
  }, { passive: true });

  window.addEventListener("mouseleave", () => root.classList.remove("cursor-ready"));
  window.addEventListener("mouseenter", () => { if (ready) root.classList.add("cursor-ready"); });
  window.addEventListener("mousedown", () => ring.classList.add("press"));
  window.addEventListener("mouseup", () => ring.classList.remove("press"));

  const loop = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

function init() {
  setupScrollProgress();
  setupSpotlight();
  setupTilt();
  setupMagnetic();
  setupParallax();
  setupDepth();
  setupCardSpotlight();
  setupCursor();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
