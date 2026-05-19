import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";

test("builds a reviewable static homepage preview", () => {
  execFileSync(process.execPath, ["scripts/build-preview.mjs"], {
    cwd: new URL("..", import.meta.url),
    stdio: "pipe",
  });

  const htmlPath = new URL("../_site/index.html", import.meta.url);
  const cssPath = new URL("../_site/assets/preview.css", import.meta.url);
  const profileImagePath = new URL("../_site/assets/img/profile/gray_pic.jpg", import.meta.url);
  const rdtGifPath = new URL("../_site/assets/img/projects/rdt-airbot-state-test.gif", import.meta.url);
  const goalVideoPath = new URL("../_site/assets/video/research/goal-conditioned-preview.mp4", import.meta.url);
  const rbmVideoPath = new URL("../_site/assets/video/research/rbm-final-project.mp4", import.meta.url);
  const html = readFileSync(htmlPath, "utf8");
  const css = readFileSync(cssPath, "utf8");
  const publicationsHtml = html.slice(html.indexOf('<section id="publications"'), html.indexOf('<section id="projects"'));
  const projectsHtml = html.slice(html.indexOf('<section id="projects"'));
  const mobileProjectHtml = projectsHtml.slice(
    projectsHtml.indexOf("Multifunctional Mobile Robotic Platform"),
    projectsHtml.indexOf("Validating Diffusion-Based Visual Imitation Learning for Robotic Manipulation")
  );
  const rdtProjectHtml = projectsHtml.slice(
    projectsHtml.indexOf("Validating Diffusion-Based Visual Imitation Learning for Robotic Manipulation"),
    projectsHtml.indexOf('<section id="honors"')
  );

  assert.match(html, /Guowei HUAI/);
  assert.match(html, /mailto:ghuai073@connect\.hkust-gz\.edu\.cn/);
  assert.match(html, /https:\/\/github\.com\/gray-wei/);
  assert.doesNotMatch(html, /ghuai073@hkust-gz\.edu\.cn/);
  assert.doesNotMatch(html, /<a href="#">GitHub<\/a>/);
  assert.match(
    html,
    /supervised by <a href="https:\/\/scholar\.google\.com\/citations\?hl=en&amp;user=kBN1B6YAAAAJ&amp;view_op=list_works&amp;sortby=pubdate">Jie SONG<\/a>/
  );
  assert.match(html, /with a particular emphasis on in-hand manipulation/);
  assert.match(html, /Dexterous Manipulation/);
  assert.match(html, /<main class="page-shell"/);
  assert.match(html, /class="focus-strip"/);
  assert.match(html, /<span>Dexterous Hands<\/span><span>Contact-rich RL<\/span><span>Teleoperation<\/span><span>Tactile Sensing<\/span>/);
  assert.match(html, /class="name-mark"/);
  assert.match(html, /<h2>Publications<\/h2>/);
  assert.match(html, /<h2>Projects<\/h2>/);
  assert.ok(html.indexOf('<section id="publications"') < html.indexOf('<section id="projects"'));
  assert.match(html, /<section id="projects"/);
  assert.match(html, /<div class="project-list">/);
  assert.match(html, /<div class="publication-list">/);
  assert.match(html, /<video class="research-video"/);
  assert.match(html, /assets\/video\/research\/goal-conditioned-preview\.mp4/);
  assert.match(html, /assets\/video\/research\/hifun-preview\.mp4/);
  assert.match(html, /class="media-pattern"/);
  assert.match(html, /class="motion-rail"/);
  assert.match(html, /<section id="publications"/);
  assert.match(html, /HiFun/);
  assert.match(html, /Goal-Conditioned In-Hand Teleoperation/);
  assert.match(html, /Dexterous Arm-Hand Teleoperation System/);
  assert.match(html, /Multifunctional Mobile Robotic Platform/);
  assert.match(html, /Validating Diffusion-Based Visual Imitation Learning for Robotic Manipulation/);
  assert.match(publicationsHtml, /HiFun: Hierarchical Real-World RL for Functional Dexterous Manipulation/);
  assert.match(publicationsHtml, /A hierarchical real-world reinforcement learning pipeline/);
  assert.match(publicationsHtml, /assets\/video\/research\/hifun-preview\.mp4/);
  assert.match(publicationsHtml, /<p class="paper-links"><a href="#">Project Page<\/a> \/ <a href="#">arXiv<\/a> \/ <a href="#">Code<\/a><\/p>/);
  assert.match(publicationsHtml, /Weibin LIU, Shulong JIANG, Ping TAN/);
  assert.doesNotMatch(projectsHtml, /HiFun: Hierarchical/);
  assert.ok(projectsHtml.indexOf("Goal-Conditioned In-Hand Teleoperation") < projectsHtml.indexOf("Dexterous Arm-Hand Teleoperation System"));
  assert.ok(projectsHtml.indexOf("Dexterous Arm-Hand Teleoperation System") < projectsHtml.indexOf("Multifunctional Mobile Robotic Platform"));
  assert.ok(
    projectsHtml.indexOf("Multifunctional Mobile Robotic Platform") <
      projectsHtml.indexOf("Validating Diffusion-Based Visual Imitation Learning for Robotic Manipulation")
  );
  assert.doesNotMatch(projectsHtml, /media-keywords/);
  assert.doesNotMatch(projectsHtml, /home-feature-keywords/);
  assert.doesNotMatch(projectsHtml, /<strong>In-Hand Rotation<\/strong>/);
  assert.doesNotMatch(projectsHtml, /<strong>Teleoperation<\/strong>/);
  assert.doesNotMatch(projectsHtml, /<strong>Mobile Robot<\/strong>/);
  assert.doesNotMatch(projectsHtml, /<strong>RDT<\/strong>/);
  assert.match(projectsHtml, /assets\/video\/research\/rbm-final-project\.mp4/);
  assert.match(projectsHtml, /Guowei HUAI, Jiahong CHEN, Qingyun WANG, Pengfei MAI/);
  assert.match(projectsHtml, /Advisors: Arthur Kar Leung LIN, Jun MA, Jie SONG/);
  assert.match(projectsHtml, /RBM Team Project/);
  assert.doesNotMatch(
    mobileProjectHtml,
    /href="https:\/\/scholar\.google\.com\/citations\?hl=en&user=kBN1B6YAAAAJ&view_op=list_works&sortby=pubdate">Jie SONG<\/a>/
  );
  assert.doesNotMatch(mobileProjectHtml, /Project Page/);
  assert.doesNotMatch(mobileProjectHtml, /arXiv/);
  assert.doesNotMatch(mobileProjectHtml, /Code/);
  assert.match(projectsHtml, /assets\/img\/projects\/rdt-airbot-state-test\.gif/);
  assert.match(projectsHtml, /Fine-tuning Robotics Diffusion Transformer on self-collected AIRBOT Play demonstrations/);
  assert.match(projectsHtml, /Yiming ZHU, Jiahong CHEN, Guowei HUAI/);
  assert.match(projectsHtml, /https:\/\/github\.com\/zachzhuu\/RDT-Airbot/);
  assert.match(rdtProjectHtml, /Report/);
  assert.match(rdtProjectHtml, /https:\/\/github\.com\/zachzhuu\/RDT-Airbot\/blob\/main\/assets\/report\.pdf/);
  assert.doesNotMatch(rdtProjectHtml, /Project Page/);
  assert.doesNotMatch(rdtProjectHtml, /arXiv/);
  assert.match(projectsHtml, /<p class="paper-links"><a href="#">Project Page<\/a> \/ <a href="#">arXiv<\/a> \/ <a href="#">Code<\/a><\/p>/);
  assert.match(
    html,
    /Guowei HUAI, <a href="https:\/\/zdchan\.github\.io\/">Hui ZHANG<\/a>, <a href="https:\/\/scholar\.google\.com\/citations\?hl=en&user=kBN1B6YAAAAJ&view_op=list_works&sortby=pubdate">Jie SONG<\/a>/
  );
  assert.match(
    html,
    /<a href="https:\/\/hly-123\.github\.io\/">Linyi HUANG<\/a>, Guowei HUAI, Weibin LIU, Shulong JIANG, Ping TAN, <a href="https:\/\/zdchan\.github\.io\/">Hui ZHANG<\/a>, <a href="https:\/\/scholar\.google\.com\/citations\?hl=en&user=kBN1B6YAAAAJ&view_op=list_works&sortby=pubdate">Jie SONG<\/a>/
  );
  assert.match(html, /Guowei HUAI, <a href="https:\/\/hly-123\.github\.io\/">Linyi HUANG<\/a>/);
  assert.doesNotMatch(html, /MPhil Full Scholarship, RBM Program, HKUST\(GZ\), 240,000 RMB over 2 years/);
  assert.match(html, /First Prize, HKUST\(GZ\) Bionic Robot Innovation Competition, MoSense Team, 50,000 RMB/);
  assert.match(html, /Quarterfinalist, 1st WBCD Competition @ ICRA 2025, Top 8/);
  assert.match(html, /Principal's First-Class Scholarship, BITZH, 30,000 RMB, 1\/2000/);
  assert.match(html, /Climbing Plan Science and Technology Innovation Project Award, 30,000 RMB/);
  assert.doesNotMatch(html, /JD Programming/);
  assert.doesNotMatch(html, /Teddy Cup/);
  assert.match(html, /Ongoing/);
  assert.doesNotMatch(html, /Core contributor/);
  assert.doesNotMatch(html, /Project leader/);
  assert.doesNotMatch(html, /Reviewer, ICRA 2026 Workshop/);
  assert.doesNotMatch(html, /Method for Obtaining Edge Contours/);
  assert.match(html, /assets\/pdf\/cv\/Guowei_Huai_CV\.pdf/);
  assert.doesNotMatch(html, /中文简历/);
  assert.doesNotMatch(html, /Guowei_Huai_CV_ZH\.pdf/);
  assert.match(html, /assets\/img\/profile\/gray_pic\.jpg/);
  assert.match(css, /\.portrait \{\s+width: 220px;\s+height: 300px;/);
  assert.doesNotMatch(html, /<div class="portrait">GH<\/div>/);
  assert.doesNotMatch(html, /Guangzhou, Guangdong, China/);
  assert.match(html, /CoRL 2026 under review/);
  assert.doesNotMatch(html, /Project structure preview/);
  assert.doesNotMatch(html, /Page structure inspired by compact academic homepages/);
  assert.doesNotMatch(html, /Media, final links, and project pages will be added after review/);
  assert.doesNotMatch(html, /Recent updates/);
  assert.doesNotMatch(html, /first version of this homepage/i);
  assert.doesNotMatch(html, /class="site-header"/);
  assert.ok(statSync(cssPath).isFile());
  assert.ok(statSync(profileImagePath).isFile());
  assert.ok(statSync(rdtGifPath).isFile());
  assert.ok(statSync(goalVideoPath).isFile());
  assert.ok(statSync(rbmVideoPath).isFile());
});
