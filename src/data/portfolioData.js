export const portfolioData = {
  profile: {
    brandName: "Armaan",
    name: "Armaan Jaswal",
    role: "Backend & Full-Stack Systems Engineer",
    location: "Delhi, India",
    timezone: "Asia/Kolkata",
    timezoneLabel: "IST (UTC+5:30)",
    coordinates: "28.6139° N, 77.2090° E",
    email: "armaanjaswal78@gmail.com",
    githubUsername: "ArmaanJaswal",
    linkedinUrl: "https://www.linkedin.com/in/armaan-jaswal-830012249/",
    twitterUrl: "https://x.com/ArmaanJaswal2",
    resumeUrl: "https://drive.google.com/file/d/1QNlpV2uOZD_xPka3x_XJxB8YDSqQQoLP/view?usp=sharing",
    bannerPresets: [
      {
        id: "cosmic",
        name: "Cosmic Voyage",
        type: "video",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-star-field-in-deep-space-34440-large.mp4",
        fallbackImg: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=80",
        description: "Deep space stellar journey"
      }
    ],
    avatars: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80", // Anime Luffy style

    ],
    aboutParagraphs: [
      "Hey, I'm Armaan, a full stack and backend systems developer who loves building clean, modern websites and apps where design, functionality, and even the smallest details matter, with a focus on making products that are both practical and visually satisfying.",
      "I spend most of my time in the terminal, the browser, or scribbling architecture on a whiteboard. I lean backend, not because I don't like frontend, but because I enjoy making polished things actually hold up under real load.",
      "I don't ship junk. Maintainability isn't optional. And I build best when I'm curious."
    ],
    snapshot: [
      "Building products.",
      "Learning technologies.",
      "Shipping consistently.",
      "Exploring distributed systems."
    ]
  },
  contacts: [
    { name: "GitHub", url: "https://github.com/ArmaanJaswal", type: "github", handle: "@ArmaanJaswal" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/armaan-jaswal-830012249/", type: "linkedin", handle: "armaan-jaswal" },
    { name: "X (Twitter)", url: "https://x.com/ArmaanJaswal2", type: "x", handle: "@ArmaanJaswal2" },
    { name: "Mail", url: "mailto:armaanjaswal78@gmail.com", type: "mail", handle: "armaanjaswal78@gmail.com" },
    { name: "Resume", url: "https://drive.google.com/file/d/1QNlpV2uOZD_xPka3x_XJxB8YDSqQQoLP/view?usp=sharing", type: "resume", handle: "View PDF" }
  ],
  projects: [
    {
      id: "ai-interviewer",
      title: "HIRE-IQ",
      year: "2026",
      category: "AI / Full Stack",
      status: "LIVE",
      isFeatured: true,
      description: "A real-time AI-powered interview platform that conducts personalized technical interviews based on the candidate's skills, experience, and target role. The interviewer dynamically generates follow-up questions, evaluates responses, and produces a detailed performance report after the session.",
      engineeringDetails: "Built a MERN-based interview pipeline with dynamic question generation, real-time conversation handling, MongoDB persistence, and AI-powered answer evaluation. Interview state is maintained throughout the session so subsequent questions can adapt to the candidate's previous responses instead of relying on a pre-generated question list.",
      image: "/Screenshot 2026-09-21 222246.png",
      tags: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "AI",
        "REST API",
        "JWT"
      ],
      demo: "https://ai-interviewer-frontend-l8o7.onrender.com/",
      github: "https://github.com/armaanjaswal/ai-interviewer"
    },
    {
      id: "randomconnect",
      title: "RandomConnect",
      year: "2026",
      category: "Fullstack",
      status: "IN DEVELOPMENT",
      isFeatured: true,
      description:
        "A real-time social platform that connects strangers instantly through random one-on-one text chat and peer-to-peer video calls.",
      engineeringDetails:
        "Built real-time user matching and messaging with WebSockets, while WebRTC handles low-latency peer-to-peer audio and video communication. A signaling layer manages SDP offers, answers, ICE candidates, connection setup, and seamless switching between randomly matched users.",
      image: "/Screenshot 2026-09-21 222847.png",
      tags: [
        "React.js",
        "Node.js",
        "Express.js",
        "WebSockets",
        "WebRTC",
        "Socket.IO",
        "MongoDB"
      ],
      github: "https://github.com/ArmaanJaswal/Random-Connect",
    },
    {
      id: "directshare",
      title: "DirectShare",
      year: "2026",
      category: "Fullstack",
      status: "IN DEVELOPMENT",
      isFeatured: true,
      description:
        "A peer-to-peer file sharing platform that allows users to transfer files directly between devices without uploading or storing the data on a central server.",
      engineeringDetails:
        "Built around WebRTC data channels for direct peer-to-peer file transfer, with WebSockets used as the signaling layer to establish connections. Files are streamed in chunks between connected peers, keeping the actual file payload off the application server.",
      image: "/Screenshot 2026-09-21 223315.png",
      tags: [
        "React.js",
        "Node.js",
        "WebSockets",
        "WebRTC",
        "TypeScript",
        "Tailwind CSS"
      ],
      demo: "#",
      github: "https://github.com/armaanjaswal/directshare",
    }
  ],
  experience: [
    {
      title: "Full Stack Intern",
      company: "BookMyWarehouse",
      period: "2026 — Present",
      location: "Remote",
      description:
        "Working on full-stack web applications using the MERN stack, developing REST APIs, responsive React interfaces, database-driven features, and real-time application functionality.",
      highlights: [
        "Developed RESTful APIs using Node.js and Express.js for application workflows.",
        "Built responsive React.js components and integrated them with backend services.",
        "Designed MongoDB schemas and implemented database operations for application features.",
        "Implemented WebSocket-based real-time communication and client-server state updates.",
        "Worked on authentication, API validation, error handling, and backend integration.",
      ],
      tags: [
        "MongoDB",
        "Express.js",
        "React.js",
        "Node.js",
        "JavaScript",
        "REST APIs",
        "WebSockets"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Independent",
      period: "2025 — 2026",
      location: "Chandigarh, India",
      description:
        "Built and deployed full-stack web applications with a focus on real-time communication, scalable backend systems, and responsive user experiences.",
      highlights: [
        "Developed full-stack applications using React.js, Node.js, Express.js, and MongoDB, integrating REST APIs and real-time communication with WebSockets.",
        "Built real-time applications using WebRTC for peer-to-peer video, audio, and data communication, including random matching and direct file sharing.",
        "Implemented responsive and interactive interfaces using Tailwind CSS while optimizing application performance and client-side state management.",
        "Designed backend APIs, authentication flows, database schemas, and real-time signaling systems for production-oriented web applications."
      ],
      tags: [
        "React.js",
        "JavaScript (ES6+)",
        "Node.js",
        "Express.js",
        "MongoDB",
        "WebSockets",
        "WebRTC",
        "Tailwind CSS",
        "REST APIs",
        "Git"
      ]
    }
  ],
  techStack: [
    {
      category: "Languages",
      items: [
        { name: "HTML", level: "Expert", icon: "html" },
        { name: "CSS", level: "Expert", icon: "css" },
        { name: "JavaScript", level: "Expert", icon: "js" }
      ]
    },
    {
      category: "Frontend Development",
      items: [
        { name: "React", level: "Advanced", icon: "react" },
        { name: "Redux", level: "Advanced", icon: "redux" }
      ]
    },
    {
      category: "Backend & Real-Time",
      items: [
        { name: "Node.js", level: "Advanced", icon: "node" },
        { name: "Express.js", level: "Advanced", icon: "express" },
        { name: "WebSockets", level: "Advanced", icon: "ws" },
        { name: "WebRTC", level: "Proficient", icon: "webrtc" }
      ]
    },
    {
      category: "Databases",
      items: [
        { name: "MongoDB", level: "Advanced", icon: "mongo" },
        { name: "MySQL", level: "Advanced", icon: "mysql" }
      ]
    },
    {
      category: "DevOps & Tools",
      items: [
        { name: "Docker", level: "Proficient", icon: "docker" },
        { name: "Git", level: "Advanced", icon: "git" },
        { name: "GitHub", level: "Advanced", icon: "github" }
      ]
    }
  ],
  github: {
    username: "ArmaanJaswal",
    profileUrl: "https://github.com/ArmaanJaswal",
    stats: [
      { label: "TOTAL COMMITS", value: "1,840+" }
    ],
    // Selected featured repositories shown on portfolio
    featuredRepos: [
      {
        name: "randomconnect",
        description:
          "Real-time random video and chat platform using WebSockets for signaling and WebRTC for peer-to-peer communication.",
        language: "JavaScript",
        languageColor: "#f7df1e",
        stars: 0,
        forks: 0,
        url: "https://github.com/ArmaanJaswal/Random-Connect"
      },
      {
        name: "ai-interviewer",
        description:
          "AI-powered real-time interview platform that conducts adaptive interviews, evaluates responses, and generates performance reports.",
        language: "JavaScript",
        languageColor: "#f7df1e",
        stars: 0,
        forks: 0,
        url: "https://github.com/ArmaanJaswal/ai-interviewer"
      }
    ]
  },
  navigation: {
    navLinks: [
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "tech-stack", label: "Skills" },
      { id: "lets-connect", label: "Contact" }
    ],
    indexLinks: [
      { id: "home", label: "00 — Home" },
      { id: "about", label: "01 — About" },
      { id: "contact", label: "02 — Contact" },
      { id: "projects", label: "03 — Projects" },
      { id: "experience", label: "04 — Experience" },
      { id: "tech-stack", label: "05 — Tech Stack" },
      { id: "github", label: "06 — GitHub" },
      { id: "lets-connect", label: "07 — Let's Connect" }
    ]
  }
};

