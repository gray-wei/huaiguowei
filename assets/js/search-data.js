// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/huaiguowei/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "papers, academic service, patents, and software copyrights.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/huaiguowei/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "selected robotics projects; media and details will be finalized later.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/huaiguowei/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "downloadable CV files.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/huaiguowei/cv/";
          },
        },{id: "nav-news",
          title: "news",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/huaiguowei/news/";
          },
        },{id: "news-quarterfinalist-top-8-in-the-1st-wbcd-competition-at-icra-2025",
          title: 'Quarterfinalist (Top 8) in the 1st WBCD Competition at ICRA 2025.',
          description: "",
          section: "News",},{id: "news-our-mosense-team-received-first-prize-in-the-hkust-gz-bionic-robot-innovation-competition",
          title: 'Our MoSense team received First Prize in the HKUST(GZ) Bionic Robot Innovation Competition....',
          description: "",
          section: "News",},{id: "news-hifun-hierarchical-real-world-rl-for-functional-dexterous-manipulation-is-under-review-at-corl-2026",
          title: 'HiFun: Hierarchical Real-World RL for Functional Dexterous Manipulation is under review at CoRL...',
          description: "",
          section: "News",},{id: "projects-dexterous-arm-hand-teleoperation-system",
          title: 'Dexterous Arm-Hand Teleoperation System',
          description: "Coordinated teleoperation for robot arms and dexterous hands with multimodal sensing and demonstration collection.",
          section: "Projects",handler: () => {
              window.location.href = "/huaiguowei/projects/dexterous-teleoperation-platform/";
            },},{id: "projects-hifun-hierarchical-real-world-rl-for-functional-dexterous-manipulation",
          title: 'HiFun: Hierarchical Real-World RL for Functional Dexterous Manipulation',
          description: "Real-world reinforcement learning for contact-rich dexterous tool-use tasks.",
          section: "Projects",handler: () => {
              window.location.href = "/huaiguowei/projects/hifun/";
            },},{id: "projects-goal-conditioned-in-hand-teleoperation",
          title: 'Goal-Conditioned In-Hand Teleoperation',
          description: "A goal-conditioned teleoperation framework for multi-axis in-hand object rotation.",
          section: "Projects",handler: () => {
              window.location.href = "/huaiguowei/projects/in-hand-rotation/";
            },},{id: "projects-multifunctional-mobile-robotic-platform",
          title: 'Multifunctional Mobile Robotic Platform',
          description: "A mobile manipulation platform integrating legged locomotion, arm coordination, dexterous teleoperation, and multimodal data collection.",
          section: "Projects",handler: () => {
              window.location.href = "/huaiguowei/projects/multifunctional-mobile-robotic-platform/";
            },},{id: "projects-validating-diffusion-based-visual-imitation-learning-for-robotic-manipulation",
          title: 'Validating Diffusion-Based Visual Imitation Learning for Robotic Manipulation',
          description: "Fine-tuning Robotics Diffusion Transformer on self-collected AIRBOT Play demonstrations for long-horizon manipulation.",
          section: "Projects",handler: () => {
              window.location.href = "/huaiguowei/projects/rdt-airbot/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/huaiguowei/assets/pdf/Guowei_Huai_CV.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%67%68%75%61%69%30%37%33@%63%6F%6E%6E%65%63%74.%68%6B%75%73%74-%67%7A.%65%64%75.%63%6E", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/huaiguowei/feed.xml", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/gray-wei", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
