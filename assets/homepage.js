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
