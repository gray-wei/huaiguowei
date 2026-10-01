// Homepage content. CV sources live in the sibling gray_cv repository.
export const person = {
  name: "Guowei Huai",
  chineseName: "怀国威",
  email: "ghuai073@connect.hkust-gz.edu.cn",
  university: "HKUST (Guangzhou)",
  degree: "PhD student in Robotics and Autonomous Systems",
  supervisor: { name: "Jie Song", url: "https://scholar.google.com/citations?hl=en&user=kBN1B6YAAAAJ&view_op=list_works&sortby=pubdate" },
  github: "https://github.com/gray-wei",
  portrait: "assets/img/profile/gray_pic.jpg",
  education: "Previously, I completed my MPhil through the Red Bird MPhil (RBM) Program at HKUST (Guangzhou) (2024–2026), advised by Jie Song. I received my B.Eng. in Computer Science from Beijing Institute of Technology, Zhuhai.",
  focus: ["VLA Models", "Dexterous Hands", "Contact-rich RL", "Teleoperation", "Tactile Sensing"],
};

export const publication = {
  title: "HiFun: A Hierarchical Framework for Efficient Functional Dexterous Manipulation Learning",
  venue: "CoRL 2026",
  status: "Accepted",
  authors: [
    { name: "Linyi Huang", url: "https://hly-123.github.io/" },
    { name: "Guowei Huai", self: true, url: "https://github.com/gray-wei" },
    { name: "Weibin Liu", url: "https://scholar.google.com/citations?user=P0IYZdYAAAAJ&hl=en" },
    { name: "Shulong Jiang", url: "https://scholar.google.com/citations?user=stsR9BcAAAAJ&hl=en" },
    { name: "Ping Tan", url: "https://scholar.google.com/citations?user=XhyKVFMAAAAJ&hl=en" },
    { name: "Weixuan Zhang", url: "https://scholar.google.com/citations?user=0zZ27MgAAAAJ&hl=en" },
    { name: "Hui Zhang", url: "https://zdchan.github.io/" },
    { name: "Jie Song", url: "https://scholar.google.com/citations?user=kBN1B6YAAAAJ&hl=en" },
  ],
  project: "https://hly-123.github.io/HiFun/",
  paper: "https://hly-123.github.io/HiFun/assets/documents/hifun-corl2026.pdf",
  description: "A hierarchical real-world reinforcement learning framework for contact-rich functional tool use with high-DoF arm–hand systems. HiFun separates contact-aware hand skills from arm motion and skill activation, enabling efficient learning and recovery from contact disturbances.",
  results: [{ value: "98.3%", label: "mean success" }, { value: "6", label: "evaluated tasks" }, { value: "2", label: "dexterous hands" }],
  training: "Up to 60 min of online human-in-the-loop training per task; the full pipeline averages approximately 109 min per task.",
  video: "assets/video/research/hifun-overview.mp4",
  poster: "assets/img/research/hifun-overview.webp",
  // Original Overview video and poster from Linyi Huang's HiFun project page.
  videoSource: "https://hly-123.github.io/HiFun/assets/media/supplementary.mp4",
  muted: false,
  loop: false,
  preload: "none",
  caption: "HiFun overview: method and real-world experiments.",
};

export const teleoperation = {
    id: "teleoperation", title: "Unified Retargeting and Arm–Hand Teleoperation", category: "Retargeting · Teleoperation · Multimodal data",
    authors: [{ name: "Guowei Huai", self: true }, { name: "Linyi Huang", url: "https://hly-123.github.io/" }],
    description: "Manus glove retargeting and Vision Pro hand tracking share a common interface in one repository, mapping human hand motion to Inspire Hand, Leap Hand, XHand, and Sharpa with optimization-based vector and fingertip objectives. Franka arm control combines GELLO with hand retargeting and also supports a 3D mouse and Vision Pro. The platform synchronizes tactile sensing, robot states, and demonstrations for real-world reinforcement and imitation learning.",
    video: "assets/video/research/teleop-preview.mp4", poster: "assets/img/research/teleop-poster.jpg",
    caption: "Vision Pro arm–hand teleoperation on Franka. Operator: Guowei Huai.", portrait: true,
    loop: false, preload: "none",
    additionalDemos: [{
      video: "assets/video/research/gello-manus-redacted.mp4", poster: "assets/img/research/gello-manus-redacted.jpg",
      caption: "GELLO + Manus arm–hand teleoperation on Franka. Operator: Linyi Huang.",
      loop: false, preload: "none",
    }],
    links: [["Teleoperation details", "projects/teleoperation/"]],
};

export const projects = [
  {
    id: "mobile-platform", title: "Multifunctional Mobile Robotic Platform", category: "Red Bird MPhil (RBM) team project",
    authors: [{ name: "Jiahong Chen" }, { name: "Guowei Huai", self: true }, { name: "Qingyun Wang" }, { name: "Pengfei Mai" }],
    advisors: "Arthur Kar Leung Lin, Jun Ma, Jie Song",
    description: "A mobile manipulation platform integrating legged locomotion, robot-arm coordination, target tracking and picking, dexterous teleoperation, tactile sensing, and multimodal data collection.",
    video: "assets/video/research/mobile-teaser.mp4", poster: "assets/img/research/mobile-poster.jpg",
    caption: "Arm–hand operation and sensor views from the team platform.", links: [],
    modules: [teleoperation],
  },
  {
    id: "rdt-airbot", title: "Validating Diffusion-Based Visual Imitation Learning for Robotic Manipulation", category: "Course project · AIRBOT Play",
    authors: [{ name: "Yiming Zhu" }, { name: "Jiahong Chen" }, { name: "Guowei Huai", self: true }],
    description: "Fine-tuning Robotics Diffusion Transformer on self-collected AIRBOT Play demonstrations for generalization, long-horizon pick-and-place, and state-aware recovery. Reproduced DP3 and RDT-1B and processed 490 Airbot500 teleoperation episodes. The course evaluation reported 72% seen-task success and 30% unseen-container generalization.",
    video: "assets/video/research/rdt-teaser.mp4", poster: "assets/img/research/rdt-poster.jpg",
    caption: "Visual manipulation experiment on AIRBOT Play.",
    links: [["Report", "https://github.com/zachzhuu/RDT-Airbot/blob/main/assets/report.pdf"], ["Code", "https://github.com/zachzhuu/RDT-Airbot"]],
  },
];

export const education = [
  { title: "PhD · Robotics and Autonomous Systems", school: "HKUST (Guangzhou)", date: "2026.09 – present" },
  { title: "MPhil · Robotics and Autonomous Systems", school: "HKUST (Guangzhou)", date: "2024.09 – 2026.09", details: "Red Bird MPhil (RBM) Program · GPA: 4.04/4.30", academicAdvisor: "Jie Song", projectAdvisor: "Arthur Kar Leung Lin" },
  { title: "B.Eng. · Computer Science", school: "Beijing Institute of Technology, Zhuhai", date: "2019 – 2023" },
];

export const honors = [
  { title: "First Prize · Bionic Robot Innovation Competition", description: "HKUST (Guangzhou), MoSense team · 50,000 RMB", date: "Oct. 2025" },
  { title: "Quarterfinalist · 1st WBCD Competition", description: "ICRA 2025 · Top 8", date: "May 2025" },
  { title: "MPhil Full Scholarship · RBM Program", description: "HKUST (Guangzhou) · 240,000 RMB over 2 years", date: "Sept. 2024" },
  { title: "Principal’s First-Class Scholarship", description: "BITZH · 30,000 RMB · 1/2000", date: "Apr. 2023" },
  { title: "Climbing Plan Science and Technology Innovation Project Award", description: "30,000 RMB", date: "May 2021" },
];
