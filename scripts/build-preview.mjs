import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { person, publication, projects, teleoperation, education, service, honors } from "./profile.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "_site");
const cvPath = "assets/pdf/cv/Guowei_Huai_CV.pdf";
const cvVersion = createHash("sha256").update(readFileSync(join(root, cvPath))).digest("hex").slice(0, 12);
const cvHref = `${cvPath}?v=${cvVersion}`;
const analytics = process.argv.includes("--production") ? `
  <!-- Statcounter: private, invisible tracking for the published site only. -->
  <script>
    var sc_project = 13357798;
    var sc_invisible = 1;
    var sc_security = "a8c60567";
  </script>
  <script src="https://www.statcounter.com/counter/counter.js" async></script>
  <noscript><div class="statcounter"><a title="Web Analytics" href="https://statcounter.com/" target="_blank" rel="noopener"><img class="statcounter" src="https://c.statcounter.com/13357798/0/a8c60567/1/" alt="Web Analytics" referrerpolicy="no-referrer-when-downgrade" /></a></div></noscript>` : "";
const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const link = (label, href, className = "") => `<a${className ? ` class="${className}"` : ""} href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
const resourceLink = (label, href) => `<a class="action-link" href="${escapeHtml(href)}"><span>${escapeHtml(label)}</span><span class="link-arrow" aria-hidden="true">↗</span></a>`;
const readingDetails = (label, content) => `<details class="reading-details"><summary><span>${escapeHtml(label)}</span><svg class="disclosure-arrow" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="m4 2 4 4-4 4" /></svg></summary><div class="details-copy">${content}</div></details>`;
function authors(items) {
  return items.map((item) => {
    const name = item.self ? `<strong>${escapeHtml(item.name)}</strong>` : escapeHtml(item.name);
    return item.url ? `<a href="${escapeHtml(item.url)}">${name}</a>` : name;
  }).join(", ");
}
function media(item, prefix = "") {
  return `<figure class="research-media${item.portrait ? " portrait-media" : ""}">
    <div class="media-frame"><video controls${item.muted === false ? "" : " muted"}${item.loop === false ? "" : " loop"} playsinline preload="${escapeHtml(item.preload || "none")}" poster="${prefix}${item.poster}" aria-label="${escapeHtml(item.caption)}">
      <source src="${prefix}${item.video}" type="video/mp4" />${link("Download the demo", prefix + (item.originalVideo || item.video))}
    </video></div><figcaption>${escapeHtml(item.caption)}</figcaption>
  </figure>`;
}
function document(title, description, body, prefix = "") {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${escapeHtml(description)}" /><meta name="theme-color" content="#ffffff" />
  <meta property="og:title" content="${escapeHtml(title)}" /><meta property="og:description" content="${escapeHtml(description)}" /><meta property="og:type" content="website" />
  <title>${escapeHtml(title)}</title>
  <link rel="icon" href="${prefix}assets/img/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="${prefix}assets/homepage.css" />
  <script src="${prefix}assets/homepage.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">${link("Guowei Huai", prefix || "#top", "wordmark")}
    <nav aria-label="Main navigation">${link("Research", prefix + "#publications")}${link("Background", prefix + "#background")}${link("CV", prefix + cvHref)}</nav>
  </header>
  ${body}
  <footer class="site-footer"><span>Guowei Huai · Updated October 2026</span>${link("GitHub", person.github)}${link("Back to top ↑", "#top")}</footer>
  ${analytics}
</body>
</html>`;
}
function renderProject(item) {
  return `<article class="project-item" id="${item.id}"><header class="project-heading"><p class="eyebrow">${escapeHtml(item.category)}</p><h3>${escapeHtml(item.title)}</h3>
      <p class="authors">${authors(item.authors)}</p>
      ${item.advisors ? `<p class="advisors">Advisors: ${escapeHtml(item.advisors)}</p>` : ""}
    </header>
    <div class="project-primary-media">${media(item)}</div>
    <div class="project-copy">
      <p>${escapeHtml(item.summary || item.description)}</p>
      ${item.links.length ? `<p class="resource-links">${item.links.map(([label, href]) => resourceLink(label, href)).join("")}</p>` : ""}
      ${item.detailsLabel ? readingDetails(item.detailsLabel, `<p>${escapeHtml(item.details || item.description)}</p>`) : ""}
    </div>
    ${(item.modules || []).map((module) => `<section class="project-module" id="${module.id}" aria-labelledby="${module.id}-heading"><header class="module-heading"><h4 id="${module.id}-heading">${escapeHtml(module.title)}</h4><p class="authors">Module contributors: ${authors(module.authors)}</p></header><div class="module-media">${media(module)}</div><div class="module-copy"><p>${escapeHtml(module.summary)}</p><p class="resource-links">${module.links.map(([label, href]) => resourceLink(label, href)).join("")}</p>${readingDetails("Implementation details", `<p>${escapeHtml(module.description)}</p>`)}</div></section>`).join("")}
  </article>`;
}
function renderEducation(item) {
  const advisors = [
    ["Academic Advisor", item.academicAdvisor],
    ["Project Advisor", item.projectAdvisor],
  ].filter(([, name]) => name);
  return `<li class="education-item">
    <time class="education-date">${escapeHtml(item.date)}</time>
    <div class="education-copy">
      <h3>${escapeHtml(item.title)}</h3>
      <p class="education-school">${escapeHtml(item.school)}</p>
      ${item.details ? `<p class="education-details">${escapeHtml(item.details)}</p>` : ""}
      ${advisors.length ? `<dl class="education-advisors">${advisors.map(([role, name]) => `<div><dt>${escapeHtml(role)}</dt><dd>${escapeHtml(name)}</dd></div>`).join("")}</dl>` : ""}
    </div>
  </li>`;
}
function renderHome() {
  return document("Guowei Huai | Dexterous Manipulation & Robot Learning", "Guowei Huai is a PhD student at HKUST (Guangzhou), working on reinforcement learning, human data for robot policy pre-training and post-training, and dexterous manipulation.", `
  <main class="page-shell" id="main">
    <section class="intro" id="top" aria-labelledby="name">
      <div class="intro-copy">
        <div class="name-line"><h1 id="name">Guowei Huai</h1><span lang="zh">怀国威</span></div>
        <p class="intro-role">${escapeHtml(person.degree)}</p>
        <p class="bio">I am a PhD student at ${escapeHtml(person.university)}, advised by ${link(person.supervisor.name, person.supervisor.url)}. ${escapeHtml(person.educationSummary)}</p>
        <p class="bio">My research focuses on <strong>dexterous manipulation and real-world robot learning</strong>, with an emphasis on <strong>reinforcement learning and learning from human data</strong>. I explore how human data can support robot policy pre-training and post-training, including fine-tuning for real-world tasks. My work spans contact-rich tool use, in-hand manipulation, and teleoperation, combining learning-based control with human guidance and tactile sensing.</p>
        <p class="research-focus">${person.focus.map(escapeHtml).join(" · ")}</p>
        <div class="contact-links">${resourceLink("Email", "mailto:" + person.email)}${resourceLink("CV", cvHref)}${resourceLink("GitHub", person.github)}</div>
      </div>
      <aside class="profile"><img class="portrait" src="${person.portrait}" width="176" height="216" alt="Guowei Huai" fetchpriority="high" /></aside>
    </section>
    <section class="updates" aria-labelledby="updates-heading"><h2 id="updates-heading">News</h2><ul>
      <li><span class="news-icon" aria-hidden="true">🎓</span><time datetime="2026-09">Sept. 2026</time><span class="news-text">Started my PhD in Robotics and Autonomous Systems at HKUST (Guangzhou).</span></li>
      <li><span class="news-icon" aria-hidden="true">🎉</span><time datetime="2026-09">Sept. 2026</time><span class="news-text">${link("HiFun", publication.project)} accepted to <strong>CoRL 2026</strong>.</span></li>
    </ul></section>
    <section class="research-section" id="publications" aria-labelledby="publications-heading">
      <div class="section-heading"><h2 id="publications-heading">Publications</h2></div>
      <article class="publication-item">${media(publication)}<div class="publication-copy">
        <p class="venue">${publication.venue} · ${publication.status}</p>
        <h3>${link(publication.title, publication.project)}</h3><p class="authors">${authors(publication.authors)}</p>
        <p>${escapeHtml(publication.summary)}</p>
        <div class="publication-evidence">
          <dl class="results">${publication.results.map((result) => `<div><dt>${escapeHtml(result.label)}</dt><dd>${escapeHtml(result.value)}</dd></div>`).join("")}</dl>
        </div>
        <p class="resource-links">${resourceLink("Project page", publication.project)}${resourceLink("Paper", publication.paper)}</p>
        ${readingDetails("Method & training details", `<p>${escapeHtml(publication.description)}</p><p class="training-note">${escapeHtml(publication.training)}</p>`)}
      </div></article>
    </section>
    <section class="research-section" id="projects" aria-labelledby="projects-heading">
      <div class="section-heading"><h2 id="projects-heading">Selected projects</h2></div>
      <div class="project-list">${projects.map(renderProject).join("")}</div>
    </section>
    <section id="background" aria-labelledby="background-heading">
      <div class="section-heading"><h2 id="background-heading">Education</h2></div>
      <ol class="education-list">${education.map(renderEducation).join("")}</ol>
    </section>
    <div class="background-grid closing-grid">
      <section id="service" aria-labelledby="service-heading"><h2 id="service-heading">Teaching &amp; service</h2><ul class="service-list">${service.map((item) => `<li><p class="entry-date">${escapeHtml(item.date)}</p><h3>${escapeHtml(item.role)}</h3><p>${item.url ? link(item.organization, item.url) : escapeHtml(item.organization)}</p>${item.description ? `<p class="service-description">${escapeHtml(item.description)}</p>` : ""}</li>`).join("")}</ul></section>
      <section id="honors" aria-labelledby="honors-heading"><h2 id="honors-heading">Honors &amp; awards</h2><ul class="entry-list honors-list">${honors.map((item) => `<li><time>${item.date}</time><strong>${item.title}</strong><span>${item.description}</span></li>`).join("")}</ul></section>
    </div>
  </main>`);
}
function renderTeleoperation() {
  const item = teleoperation;
  return document("Dexterous Arm–Hand Teleoperation | Guowei Huai", item.description, `
    <main class="page-shell project-page" id="main">
      <div id="top"><p class="eyebrow">Mobile robotic platform · Teleoperation module</p><h1>${item.title}</h1><p class="authors">${authors(item.authors)}</p><p class="entry-date">May 2025 – March 2026</p></div>
      <p class="project-lead">A platform for collecting coordinated arm–hand demonstrations across dexterous hands, with tactile sensing and robot-state synchronization.</p>
      ${media({ ...item, video: item.originalVideo }, "../../")}
      <section><h2>Manus retargeting and a unified interface</h2><p>Developed optimization-based retargeting for Manus glove signals using vector and fingertip objectives, alongside Vision Pro hand-tracking inputs. Both input paths are unified in one repository with a common interface for mapping human hand motion to Inspire Hand, Leap Hand, XHand, and Sharpa.</p></section>
      <section><h2>Coordinated arm teleoperation</h2><p>GELLO controls the Franka arm while Manus glove retargeting drives the dexterous hand, enabling coordinated arm–hand demonstrations. Franka control also supports a 3D mouse and Vision Pro end-effector control.</p>${item.additionalDemos.map((demo) => media(demo, "../../")).join("")}</section>
      <section><h2>Multimodal demonstration data</h2><p>Piezoresistive, electromagnetic, and vision-based tactile sensors are integrated with robot states and demonstrations. Synchronized streams support real-world reinforcement and imitation learning.</p></section>
      <section><h2>My contribution</h2><p>Led implementation of Manus and Vision Pro retargeting, their shared repository and hand-control interface, the Franka teleoperation interfaces, and integration of tactile streams with robot states and demonstration data.</p></section>
      <p>${link("← Back to the mobile robotic platform", "../../#mobile-platform")}</p>
    </main>`, "../../");
}

rmSync(outDir, { force: true, recursive: true });
mkdirSync(join(outDir, "projects", "teleoperation"), { recursive: true });
writeFileSync(join(outDir, "index.html"), renderHome());
writeFileSync(join(outDir, "projects", "teleoperation", "index.html"), renderTeleoperation());
const files = ["assets/homepage.css", "assets/homepage.js", "assets/img/favicon.svg", person.portrait,
  "assets/pdf/cv/Guowei_Huai_CV.pdf",
  ...[publication, ...projects, teleoperation, ...teleoperation.additionalDemos].flatMap((item) => [item.video, item.poster, ...(item.originalVideo ? [item.originalVideo] : [])])];
for (const relative of new Set(files)) {
  const destination = join(outDir, relative);
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(join(root, relative), destination);
}
console.log(`Homepage built at ${join(outDir, "index.html")}`);
