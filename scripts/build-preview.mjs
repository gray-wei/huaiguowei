import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "_site");

const person = {
  name: "Guowei HUAI",
  cnName: "怀国威",
  subtitle: "MPhil student in Robotics and Autonomous Systems at HKUST(GZ)",
  location: "Guangzhou, Guangdong, China",
  email: "ghuai073@hkust-gz.edu.cn",
  research:
    "I work on dexterous manipulation, real-world robot learning, and teleoperation. My current focus is building robot systems that connect human demonstrations, tactile and visual sensing, and reinforcement/imitation learning for contact-rich manipulation.",
  focus: ["dexterous hands", "contact-rich RL", "teleoperation", "tactile sensing"],
};

const links = [
  ["Email", `mailto:${person.email}`],
  ["CV", "assets/pdf/cv/Guowei_Huai_CV.pdf"],
  ["中文简历", "assets/pdf/cv/Guowei_Huai_CV_ZH.pdf"],
  ["Google Scholar", "#"],
  ["Github", "#"],
];

const researchItems = [
  {
    title: "HiFun: Hierarchical Real-World RL for Functional Dexterous Manipulation",
    authors: "Guowei Huai and collaborators",
    venue: "CoRL 2026 under review",
    role: "Core contributor",
    description:
      "A hierarchical real-world reinforcement learning pipeline for contact-rich functional dexterous manipulation, targeting tool-use tasks with high-DoF arm-hand systems.",
    links: ["Project Page", "PDF", "Video"],
    media: "HiFun",
    video: "assets/video/research/hifun-preview.mp4",
  },
  {
    title: "Goal-Conditioned In-Hand Rotation Teleoperation Framework",
    authors: "Guowei Huai",
    venue: "Active research project",
    role: "Project leader",
    description:
      "A goal-conditioned teleoperation and RL framework for multi-axis in-hand object rotation, using force-closure grasp initialization and tactile-aware control.",
    links: ["Project Page", "Demo"],
    media: "In-Hand Rotation",
    video: "assets/video/research/inhand-preview.mp4",
  },
  {
    title: "Dexterous Teleoperation and Multimodal Data Platform",
    authors: "Guowei Huai",
    venue: "Research platform",
    role: "Project leader",
    description:
      "A cross-embodiment teleoperation and data collection platform connecting Vision Pro, Manus glove, GELLO, tactile sensing, and several dexterous hands.",
    links: ["Project Page", "Demo"],
    media: "Teleoperation",
    video: "assets/video/research/teleop-preview.mp4",
  },
];

const publications = [
  "HiFun: Hierarchical Real-World RL for Functional Dexterous Manipulation, CoRL 2026 under review, second author.",
  "Reviewer, ICRA 2026 Workshop on Manipulation Robustness.",
  "Method for Obtaining Edge Contours for Robot Navigation, invention patent.",
];

const honors = [
  "First Prize, HKUST(GZ) Bionic Robot Innovation Competition, MoSense Team.",
  "Quarterfinalist (Top 8), 1st WBCD Competition at ICRA 2025.",
  "MPhil Full Scholarship, RBM Program, HKUST(GZ).",
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderLinks(items) {
  return items
    .map(([label, href]) => `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`)
    .join(" <span>/</span> ");
}

function renderInlineLinks(items) {
  return items.map((label) => `<a href="#">${escapeHtml(label)}</a>`).join(" / ");
}

function renderFocus(items) {
  return items.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
}

function renderResearchItem(item) {
  return `
    <article class="paper-item">
      <div class="media-box" aria-hidden="true">
        <video class="research-video" src="${escapeHtml(item.video)}" autoplay muted loop playsinline preload="metadata"></video>
        <span class="media-pattern"></span>
        <span class="motion-rail"></span>
        <strong>${escapeHtml(item.media)}</strong>
      </div>
      <div class="paper-copy">
        <h3><a href="#">${escapeHtml(item.title)}</a></h3>
        <p class="authors">${escapeHtml(item.authors)}</p>
        <p class="venue">${escapeHtml(item.venue)} · ${escapeHtml(item.role)}</p>
        <p class="paper-links">${renderInlineLinks(item.links)}</p>
        <p>${escapeHtml(item.description)}</p>
      </div>
    </article>
  `;
}

function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderHtml() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${person.name}</title>
  <meta name="description" content="Academic homepage preview for ${person.name}" />
  <link rel="stylesheet" href="assets/preview.css" />
</head>
<body>
  <main class="page-shell" id="top">
    <section class="intro">
      <div class="intro-copy">
        <div class="name-line">
          <h1>${escapeHtml(person.name)}</h1>
          <span class="name-mark">${escapeHtml(person.cnName)}</span>
        </div>
        <p>${escapeHtml(person.subtitle)}.</p>
        <p>${escapeHtml(person.research)}</p>
        <div class="focus-strip">${renderFocus(person.focus)}</div>
        <p class="links">${renderLinks(links)}</p>
      </div>
      <aside class="profile">
        <div class="portrait">GH</div>
        <p>${escapeHtml(person.location)}</p>
      </aside>
    </section>

    <section id="research">
      <h2>Research</h2>
      <p class="section-note">I am interested in dexterous manipulation and robot learning for real-world contact-rich tasks. Representative projects are listed below.</p>
      <div class="paper-list">${researchItems.map(renderResearchItem).join("")}</div>
    </section>

    <section id="publications">
      <h2>Publications & Service</h2>
      <ul class="text-list">${renderList(publications)}</ul>
    </section>

    <section id="honors">
      <h2>Honors & Awards</h2>
      <ul class="text-list">${renderList(honors)}</ul>
    </section>

    <footer>
      Page structure inspired by compact academic homepages. Media, final links, and project pages will be added after review.
    </footer>
  </main>
</body>
</html>`;
}

const css = `
:root {
  --ink: #222;
  --muted: #555;
  --soft: #777;
  --line: #ddd;
  --link: #1772a6;
  --paper: #fff;
  --media: #edf1f2;
  --accent: #b74c38;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  line-height: 1.55;
}

a {
  color: var(--link);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.page-shell {
  width: min(900px, calc(100% - 36px));
  margin: 0 auto;
  padding: 42px 0 36px;
}

.intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 190px;
  gap: 34px;
  align-items: start;
}

h1 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 38px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: 0;
}

.name-line {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 18px;
}

.name-mark {
  padding-left: 12px;
  border-left: 3px solid var(--accent);
  color: var(--soft);
  font-size: 18px;
  font-weight: 500;
}

h2 {
  margin: 34px 0 12px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--line);
  font-size: 21px;
  font-weight: 650;
  letter-spacing: 0;
}

h3 {
  margin: 0 0 3px;
  font-size: 16px;
  font-weight: 650;
  line-height: 1.35;
  letter-spacing: 0;
}

p {
  margin: 0 0 11px;
}

.links {
  margin-top: 16px;
}

.focus-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0 16px;
}

.focus-strip span {
  padding: 2px 8px;
  border-left: 2px solid var(--accent);
  background: #faf7f5;
  color: #4d4d4d;
  font-size: 13px;
}

.links span,
.paper-links {
  color: var(--soft);
}

.profile {
  color: var(--muted);
  font-size: 13px;
  text-align: center;
}

.portrait {
  display: grid;
  width: 178px;
  height: 178px;
  margin: 0 auto 10px;
  place-items: center;
  border: 1px solid var(--line);
  background: var(--media);
  color: #34535d;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 42px;
}

.section-note {
  max-width: 760px;
}

.paper-list {
  display: grid;
  gap: 22px;
  margin-top: 18px;
}

.paper-item {
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.media-box {
  position: relative;
  display: grid;
  min-height: 128px;
  place-items: center;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--media);
  color: #34535d;
  text-align: center;
  font-weight: 650;
}

.research-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.72;
  filter: saturate(0.82) contrast(0.92);
  transition: opacity 180ms ease, filter 180ms ease, transform 420ms ease;
}

.paper-item:hover .research-video {
  opacity: 0.9;
  filter: saturate(1) contrast(1);
  transform: scale(1.025);
}

.paper-item {
  position: relative;
}

.paper-item::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -13px;
  width: 2px;
  background: linear-gradient(var(--accent), rgba(183, 76, 56, 0));
  content: "";
  opacity: 0.45;
}

.media-box strong {
  position: relative;
  z-index: 1;
  max-width: 84%;
  padding: 3px 7px;
  background: rgba(255, 255, 255, 0.78);
}

.media-pattern {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(183, 76, 56, 0.12) 1px, transparent 1px),
    linear-gradient(0deg, rgba(23, 114, 166, 0.11) 1px, transparent 1px);
  background-size: 18px 18px;
  mix-blend-mode: screen;
  opacity: 0.8;
}

.media-pattern::after {
  position: absolute;
  right: 18px;
  bottom: 18px;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(52, 83, 93, 0.28);
  border-radius: 50%;
  content: "";
}

.motion-rail {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 36%;
  height: 3px;
  background: var(--accent);
  animation: rail-scan 3.8s ease-in-out infinite;
  opacity: 0.75;
}

@keyframes rail-scan {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(178%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .motion-rail {
    animation: none;
  }

  .research-video {
    transition: none;
  }
}

.authors,
.venue {
  color: var(--muted);
}

.paper-links {
  margin-bottom: 8px;
}

.text-list {
  margin: 0;
  padding-left: 20px;
}

.text-list li + li {
  margin-top: 8px;
}

footer {
  margin-top: 36px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  color: var(--soft);
  font-size: 13px;
}

@media (max-width: 720px) {
  .intro,
  .paper-item {
    display: block;
  }

  .profile {
    margin-top: 22px;
    text-align: left;
  }

  .portrait {
    width: 150px;
    height: 150px;
    margin-left: 0;
  }

  .name-line {
    display: block;
  }

  .name-mark {
    display: inline-block;
    margin-top: 8px;
  }

  .media-box {
    min-height: 110px;
    margin-bottom: 12px;
  }
}
`;

rmSync(outDir, { force: true, recursive: true });
mkdirSync(join(outDir, "assets", "pdf", "cv"), { recursive: true });
mkdirSync(join(outDir, "assets", "video", "research"), { recursive: true });
writeFileSync(join(outDir, "index.html"), renderHtml());
writeFileSync(join(outDir, "assets", "preview.css"), css.trimStart());
cpSync(join(root, "assets", "pdf", "cv", "Guowei_Huai_CV.pdf"), join(outDir, "assets", "pdf", "cv", "Guowei_Huai_CV.pdf"));
cpSync(join(root, "assets", "pdf", "cv", "Guowei_Huai_CV_ZH.pdf"), join(outDir, "assets", "pdf", "cv", "Guowei_Huai_CV_ZH.pdf"));
cpSync(join(root, "assets", "video", "research", "hifun-preview.mp4"), join(outDir, "assets", "video", "research", "hifun-preview.mp4"));
cpSync(join(root, "assets", "video", "research", "inhand-preview.mp4"), join(outDir, "assets", "video", "research", "inhand-preview.mp4"));
cpSync(join(root, "assets", "video", "research", "teleop-preview.mp4"), join(outDir, "assets", "video", "research", "teleop-preview.mp4"));

console.log(`Preview built at ${join(outDir, "index.html")}`);
