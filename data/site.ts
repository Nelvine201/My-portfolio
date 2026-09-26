export const siteConfig = {
  name: "Nelvin Ochieng",
  initials: "NO",
  role: "Full-stack developer",
  availability: "Available for projects",
  email: "nelvinakinyi6@gmail.com",
  cv: "https://docs.google.com/document/d/1EIDYUshdJx_0RtOxXE89SmlYAGZ0ry2fqvqxcIRtWXc/edit?usp=drive_link",
  devtoUsername: "nelvin_ochieng",
  socials: {
    github: "https://github.com/Nelvine201",
    linkedin: "https://www.linkedin.com/in/nelvin-ochieng-a9103929a/",
    devto: "https://dev.to/nelvin_ochieng",
    x: "https://x.com/[YOUR_X_USERNAME]",
    instagram: "https://instagram.com/[YOUR_INSTAGRAM_USERNAME]",
    whatsapp: "https://wa.me/[YOUR_WHATSAPP_NUMBER]",
  },
  hero: {
    headline: "Full-stack development with a backend focus.",
    bio: "I’m building my software engineering skills through hands-on projects, with a growing focus on backend development, systems, and web architecture. I learn by breaking problems down, building the solution, and understanding why it works.",
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Articles", href: "#articles" },
    { label: "Hobbies", href: "#hobbies" },
    { label: "Contact", href: "#contact" },
  ],
  projects: [
    {
      title: "Chama Salama",
      subtitle: "An offline-first savings group management system built for chamas in Kenya.",
      problem: "Many chamas still rely on notebooks, WhatsApp threads, and memory to track contributions and payouts. This becomes difficult when members miss meetings, records are disputed, or the group has unreliable internet access. Withdrawals can also lack a clear multi-person approval process.",
      solution: "Chama Salama provides a single source of truth for chama contributions and payouts, with offline contribution recording and synchronization, M-Pesa Daraja integration, and a multi-signature withdrawal flow requiring at least three members to approve a withdrawal.",
      outcome: "",
      tech: ["Go", "SQLite", "Daraja API", "HTML", "CSS"],
      demo: "https://chama-salama.onrender.com/",
      source: "https://github.com/Nelvine201/chama-salama",
    },
  ],
  experience: [
    {
      period: "[DATE]",
      title: "[ROLE]",
      organization: "[ORGANIZATION]",
      description: "[WHAT YOU WORKED ON / LEARNED]",
    },
  ],
  education: [
    {
      period: "[DATE]",
      title: "[DEGREE / PROGRAM]",
      organization: "[INSTITUTION]",
      description: "[OPTIONAL DETAIL]",
    },
  ],
  competencies: {
    Languages: ["Go", "JavaScript", "HTML", "CSS"],
    "Backend & Data": ["[TECHNOLOGY]", "[DATABASE]"],
    Tools: ["Git", "Docker", "[TOOL]"],
  },
  hobbies: {
    reading: "[CURRENT_BOOK / TOPIC]",
    experiments: "[EXPERIMENTS, SIDE PROJECTS, OR INTERESTS]",
    workflow: "[MUSIC / ROUTINE / FOCUS WORKFLOW]",
  },
  mockArticles: [
    {
      title: "Starting My Go Journey",
      description: "A reflection on beginning my journey with Go and learning through hands-on practice.",
      published_at: "2026-01-01",
      reading_time_minutes: 3,
      tag_list: ["go", "learning"],
      url: "https://www.linkedin.com/pulse/starting-my-go-journey-nelvin-ochieng-b3arf",
      source: "LinkedIn",
    },
  ],
  footer: {
    tagline: "[SHORT CLOSING LINE]",
  },
} as const;
