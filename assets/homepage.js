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

// Introduce recent updates once as they enter the viewport.
const news = document.querySelector(".updates");
if (news && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const [index, item] of [...news.querySelectorAll("li")].entries()) {
        item.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }], {
          duration: 420, delay: index * 70, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards",
        });
      }
      observer.unobserve(news);
    }
  }, { threshold: 0.15 });
  observer.observe(news);
}
