// Keep audio and motion under visitor control; only one demo plays at a time.
const videos = [...document.querySelectorAll("video")];
for (const video of videos) {
  video.addEventListener("play", () => {
    for (const other of videos) if (other !== video) other.pause();
  });
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) for (const video of videos) video.pause();
});

// Introduce each reading group once; content stays visible without JavaScript.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
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
