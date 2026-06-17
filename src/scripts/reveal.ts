function animateCount(el: HTMLElement) {
  const target = Number(el.dataset.animateCount ?? "0");
  const suffix = el.dataset.countSuffix ?? "";
  const duration = 900;
  const start = performance.now();

  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${Math.round(eased * target)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function observeOnce(
  selector: string,
  threshold: number,
  onIntersect: (el: HTMLElement) => void,
) {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          onIntersect(entry.target as HTMLElement);
          obs.unobserve(entry.target);
        }
      }
    },
    { threshold },
  );

  elements.forEach((el) => observer.observe(el));
}

function setupReveal() {
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    el.classList.add("reveal");
  });

  observeOnce("[data-reveal]", 0.15, (el) => el.classList.add("is-visible"));

  observeOnce("[data-animate-bar]", 0.4, (el) => {
    const value = el.dataset.animateBar;
    if (value) el.style.width = `${value}%`;
  });

  observeOnce("[data-animate-count]", 0.5, (el) => animateCount(el));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupReveal);
} else {
  setupReveal();
}
