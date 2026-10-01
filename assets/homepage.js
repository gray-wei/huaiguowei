// Play one visible demo quietly; native controls always take precedence.
const videos = [...document.querySelectorAll("video")];
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const visibility = new Map();
const pausedByVisitor = new WeakSet();
const blockedAutoplay = new WeakSet();
const automaticStarts = new WeakSet();
const automaticPauses = new WeakSet();
let manualPlayback;
function pauseAutomatically(video) {
  if (video.paused) return;
  automaticPauses.add(video);
  video.pause();
}
function updateAutoplay() {
  if (document.hidden) {
    for (const video of videos) pauseAutomatically(video);
    return;
  }
  if (motionPreference.matches) {
    for (const video of videos) if (video !== manualPlayback || (visibility.get(video) || 0) < 0.15) pauseAutomatically(video);
    return;
  }
  if (manualPlayback && !manualPlayback.paused && (visibility.get(manualPlayback) || 0) >= 0.15) return;
  const candidates = videos.filter((video) => (visibility.get(video) || 0) >= 0.55 && !pausedByVisitor.has(video) && !blockedAutoplay.has(video));
  const distance = (video) => {
    const bounds = video.getBoundingClientRect();
    return Math.abs(bounds.top + bounds.height / 2 - window.innerHeight / 2);
  };
  const next = candidates.sort((a, b) => distance(a) - distance(b))[0];
  for (const video of videos) if (video !== next) pauseAutomatically(video);
  if (next && next.paused) {
    next.muted = true;
    automaticStarts.add(next);
    next.play().catch((error) => {
      automaticStarts.delete(next);
      if (error.name !== "AbortError") {
        blockedAutoplay.add(next);
        updateAutoplay();
      }
    });
  }
}
for (const video of videos) {
  const frame = video.closest(".media-frame");
  if (frame) {
    let pointerInside = false;
    const updateHover = (event) => {
      if (!pointerInside) return;
      const transform = getComputedStyle(frame).transform;
      const lift = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;
      const bottom = frame.getBoundingClientRect().bottom - lift;
      frame.classList.toggle("is-hovered", event.clientY < bottom - 56);
    };
    frame.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      pointerInside = true;
      updateHover(event);
    });
    frame.addEventListener("pointermove", updateHover);
    frame.addEventListener("pointerleave", () => {
      pointerInside = false;
      frame.classList.remove("is-hovered");
    });
    // Keep native controls steady while playing or hovering their lower region.
    video.addEventListener("play", () => frame.classList.add("is-playing"));
    for (const event of ["pause", "ended", "emptied"]) video.addEventListener(event, () => frame.classList.remove("is-playing"));
  }
  video.addEventListener("play", () => {
    const automatic = automaticStarts.delete(video);
    if (video.paused) return;
    if (!automatic) manualPlayback = video;
    pausedByVisitor.delete(video);
    for (const other of videos) if (other !== video) pauseAutomatically(other);
  });
  video.addEventListener("pause", () => {
    if (automaticPauses.delete(video)) return;
    pausedByVisitor.add(video);
    if (manualPlayback === video) manualPlayback = undefined;
    updateAutoplay();
  });
}
if ("IntersectionObserver" in window) {
  const mediaObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) visibility.set(entry.target, entry.intersectionRatio);
    updateAutoplay();
  }, { threshold: [0, 0.15, 0.55, 0.85, 1] });
  for (const video of videos) mediaObserver.observe(video);
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) for (const video of videos) pauseAutomatically(video);
  else updateAutoplay();
});
motionPreference.addEventListener("change", updateAutoplay);

// Introduce each reading group once; content stays visible without JavaScript.
if (!motionPreference.matches && "IntersectionObserver" in window && "animate" in Element.prototype) {
  const animations = new Set();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (motionPreference.matches) continue;
      const newsItem = entry.target.closest(".updates");
      const delay = newsItem ? [...newsItem.querySelectorAll("li")].indexOf(entry.target) * 70 : 0;
      const animation = entry.target.animate([{ opacity: newsItem ? 0 : 0.55, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }], {
        duration: newsItem ? 420 : 360, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards",
      });
      animations.add(animation);
      for (const event of ["finish", "cancel"]) animation.addEventListener(event, () => animations.delete(animation), { once: true });
    }
  }, { threshold: 0.08 });
  for (const group of document.querySelectorAll(".intro, .updates li, .section-heading, .publication-copy, .project-heading, .project-copy, .education-item, .closing-grid > section, .project-page > #top")) observer.observe(group);
  for (const section of document.querySelectorAll(".project-page > section")) {
    const groups = section.querySelector(".research-media") ? section.querySelectorAll(":scope > h2, :scope > p") : [section];
    for (const group of groups) observer.observe(group);
  }
  motionPreference.addEventListener("change", () => {
    if (!motionPreference.matches) return;
    observer.disconnect();
    for (const animation of animations) animation.cancel();
  });
}
