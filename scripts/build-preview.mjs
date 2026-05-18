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
  email: "ghuai073@connect.hkust-gz.edu.cn",
  image: "assets/img/profile/gray_pic.jpg",
  supervisor: {
    name: "Jie SONG",
    url: "https://scholar.google.com/citations?hl=en&user=kBN1B6YAAAAJ&view_op=list_works&sortby=pubdate",
  },
  education: "I received my B.Eng. in Computer Science from Beijing Institute of Technology, Zhuhai.",
  research:
    "My research focuses on dexterous manipulation, with a particular emphasis on in-hand manipulation, real-world robot learning, teleoperation, and tactile sensing for contact-rich robotic tasks.",
  focus: ["Dexterous Hands", "Contact-rich RL", "Teleoperation", "Tactile Sensing"],
};

const jieSongUrl = person.supervisor.url;

const links = [
  ["Email", `mailto:${person.email}`],
  ["CV", "assets/pdf/cv/Guowei_Huai_CV.pdf"],
  ["Google Scholar", "#"],
  ["GitHub", "https://github.com/gray-wei"],
];

const projectItems = [
  {
    title: "Goal-Conditioned In-Hand Teleoperation",
    authorsHtml: `Guowei HUAI, <a href="https://zdchan.github.io/">Hui ZHANG</a>, <a href="${jieSongUrl}">Jie SONG</a>`,
    status: "Ongoing",
    description:
      "A goal-conditioned in-hand teleoperation framework for multi-axis object rotation, using force-closure grasp initialization and tactile-aware control.",
    media: "In-Hand Rotation",
    video: "assets/video/research/goal-conditioned-preview.mp4",
    links: [
      ["Project Page", "#"],
      ["arXiv", "#"],
      ["Code", "#"],
    ],
  },
  {
    title: "Dexterous Arm-Hand Teleoperation System",
    authorsHtml: 'Guowei HUAI, <a href="https://hly-123.github.io/">Linyi HUANG</a>',
    status: "Teleoperation System",
    description:
      "A coordinated teleoperation system for robot arms and dexterous hands, integrating Vision Pro, Manus glove, GELLO, tactile sensing, and demonstration collection.",
    media: "Teleoperation",
    video: "assets/video/research/teleop-preview.mp4",
    links: [
      ["Project Page", "#"],
      ["arXiv", "#"],
      ["Code", "#"],
    ],
  },
  {
    title: "Multifunctional Mobile Robotic Platform",
    authorsHtml: "Guowei HUAI, Jiahong CHEN, Qingyun WANG, Pengfei MAI",
    advisorsHtml: "Arthur Kar Leung LIN, Jun MA, Jie SONG",
    status: "RBM Team Project",
    description:
      "A mobile manipulation platform integrating legged locomotion, robot-arm coordination, target tracking and picking, dexterous teleoperation, tactile sensing, and multimodal data collection.",
    media: "Mobile Robot",
    video: "assets/video/research/rbm-final-project.mp4",
    linksEnabled: false,
  },
  {
    title: "Validating Diffusion-Based Visual Imitation Learning for Robotic Manipulation",
    authorsHtml: "Yiming ZHU, Jiahong CHEN, Guowei HUAI",
    status: "Course project",
    description:
      "Fine-tuning Robotics Diffusion Transformer on self-collected AIRBOT Play demonstrations for generalization, long-horizon pick-and-place, and state-aware recovery.",
    media: "RDT",
    image: "assets/img/projects/rdt-airbot-state-test.gif",
    links: [
      ["Report", "https://github.com/zachzhuu/RDT-Airbot/blob/main/assets/report.pdf"],
      ["Code", "https://github.com/zachzhuu/RDT-Airbot"],
    ],
  },
];

const publicationItems = [
  {
    title: "HiFun: Hierarchical Real-World RL for Functional Dexterous Manipulation",
    authorsHtml:
      `<a href="https://hly-123.github.io/">Linyi HUANG</a>, Guowei HUAI, Weibin LIU, Shulong JIANG, Ping TAN, <a href="https://zdchan.github.io/">Hui ZHANG</a>, <a href="${jieSongUrl}">Jie SONG</a>`,
    status: "CoRL 2026 under review",
    description:
      "A hierarchical real-world reinforcement learning pipeline for contact-rich functional dexterous manipulation, targeting tool-use tasks with high-DoF arm-hand systems.",
    media: "HiFun",
    video: "assets/video/research/hifun-preview.mp4",
    links: [
      ["Project Page", "#"],
      ["arXiv", "#"],
      ["Code", "#"],
    ],
  },
];

const honors = [
  "MPhil Full Scholarship, RBM Program, HKUST(GZ), 240,000 RMB over 2 years.",
  "First Prize, HKUST(GZ) Bionic Robot Innovation Competition, MoSense Team, 50,000 RMB.",
  "Quarterfinalist, 1st WBCD Competition @ ICRA 2025, Top 8.",
  "Principal's First-Class Scholarship, BITZH, 30,000 RMB, 1/2000.",
  "Climbing Plan Science and Technology Innovation Project Award, 30,000 RMB.",
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
    .join("<span>/</span>");
}

function renderFocus(items) {
  return items.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
}

function renderFeatureLinks(items) {
  return items.map(([label, href]) => `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`).join(" / ");
}

function renderBio() {
  return `I am a second-year MPhil student in Robotics and Autonomous Systems at the Hong Kong University of Science and Technology (Guangzhou), supervised by <a href="${escapeHtml(person.supervisor.url)}">${escapeHtml(person.supervisor.name)}</a>. ${escapeHtml(person.education)} ${escapeHtml(person.research)}`;
}

function renderFeatureItem(item, itemClass = "project-item", copyClass = "project-copy") {
  return `
    <article class="${itemClass}">
      <div class="media-column">
        <div class="media-box" aria-hidden="true">
          ${
            item.image
              ? `<img class="research-image" src="${escapeHtml(item.image)}" alt="" />`
              : `<video class="research-video" src="${escapeHtml(item.video)}" autoplay muted loop playsinline preload="metadata"></video>`
          }
          <span class="media-pattern"></span>
          <span class="motion-rail"></span>
        </div>
      </div>
      <div class="${copyClass}">
        <h3><a href="#">${escapeHtml(item.title)}</a></h3>
        <p class="authors">${item.authorsHtml}</p>
        ${item.advisorsHtml ? `<p class="advisors">Advisors: ${item.advisorsHtml}</p>` : ""}
        <p class="project-status">${escapeHtml(item.status)}</p>
        ${item.linksEnabled === false ? "" : `<p class="paper-links">${renderFeatureLinks(item.links)}</p>`}
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
        <p>${renderBio()}</p>
        <div class="focus-strip">${renderFocus(person.focus)}</div>
        <p class="links">${renderLinks(links)}</p>
      </div>
      <aside class="profile">
        <img class="portrait" src="${escapeHtml(person.image)}" alt="${escapeHtml(person.name)}" />
      </aside>
    </section>

    <section id="publications">
      <h2>Publications</h2>
      <div class="publication-list">${publicationItems.map((item) => renderFeatureItem(item, "publication-item", "publication-copy")).join("")}</div>
    </section>

    <section id="projects">
      <h2>Projects</h2>
      <p class="section-note">Selected projects in dexterous manipulation, in-hand manipulation, teleoperation, and robot learning for real-world contact-rich tasks.</p>
      <div class="project-list">${projectItems.map((item) => renderFeatureItem(item)).join("")}</div>
    </section>

    <section id="honors">
      <h2>Honors & Awards</h2>
      <ul class="text-list">${renderList(honors)}</ul>
    </section>

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
  grid-template-columns: minmax(0, 1fr) 220px;
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
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0 14px;
  align-items: center;
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

.links span {
  color: var(--soft);
}

.paper-links {
  color: var(--soft);
  margin-bottom: 8px;
}

.profile {
  color: var(--muted);
  font-size: 13px;
  text-align: center;
}

.portrait {
  width: 220px;
  height: 300px;
  margin: 0 auto;
  border: 1px solid var(--line);
  background: var(--media);
  object-fit: cover;
  object-position: center 30%;
}

.section-note {
  max-width: 760px;
}

.project-list,
.publication-list {
  display: grid;
  gap: 22px;
  margin-top: 18px;
}

.project-item,
.publication-item {
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.media-column {
  min-width: 0;
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

.research-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-item:hover .research-video,
.publication-item:hover .research-video {
  opacity: 0.9;
  filter: saturate(1) contrast(1);
  transform: scale(1.025);
}

.project-item,
.publication-item {
  position: relative;
}

.project-item::before,
.publication-item::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -13px;
  width: 2px;
  background: linear-gradient(var(--accent), rgba(183, 76, 56, 0));
  content: "";
  opacity: 0.45;
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
.advisors,
.project-status {
  color: var(--muted);
}

.project-status {
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
  .project-item,
  .publication-item {
    display: block;
  }

  .profile {
    margin-top: 22px;
    text-align: left;
  }

  .portrait {
    width: 165px;
    height: 225px;
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
mkdirSync(join(outDir, "assets", "img", "profile"), { recursive: true });
mkdirSync(join(outDir, "assets", "img", "projects"), { recursive: true });
mkdirSync(join(outDir, "assets", "video", "research"), { recursive: true });
writeFileSync(join(outDir, "index.html"), renderHtml());
writeFileSync(join(outDir, "assets", "preview.css"), css.trimStart());
cpSync(join(root, "assets", "img", "profile", "gray_pic.jpg"), join(outDir, "assets", "img", "profile", "gray_pic.jpg"));
cpSync(join(root, "assets", "img", "projects", "rdt-airbot-state-test.gif"), join(outDir, "assets", "img", "projects", "rdt-airbot-state-test.gif"));
cpSync(join(root, "assets", "pdf", "cv", "Guowei_Huai_CV.pdf"), join(outDir, "assets", "pdf", "cv", "Guowei_Huai_CV.pdf"));
cpSync(join(root, "assets", "pdf", "cv", "Guowei_Huai_CV_ZH.pdf"), join(outDir, "assets", "pdf", "cv", "Guowei_Huai_CV_ZH.pdf"));
cpSync(join(root, "assets", "video", "research", "hifun-preview.mp4"), join(outDir, "assets", "video", "research", "hifun-preview.mp4"));
cpSync(join(root, "assets", "video", "research", "goal-conditioned-preview.mp4"), join(outDir, "assets", "video", "research", "goal-conditioned-preview.mp4"));
cpSync(join(root, "assets", "video", "research", "teleop-preview.mp4"), join(outDir, "assets", "video", "research", "teleop-preview.mp4"));
cpSync(join(root, "assets", "video", "research", "rbm-final-project.mp4"), join(outDir, "assets", "video", "research", "rbm-final-project.mp4"));

console.log(`Preview built at ${join(outDir, "index.html")}`);
