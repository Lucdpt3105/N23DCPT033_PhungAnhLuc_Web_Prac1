// Curated editorial imagery optimized with WebP compression (lightweight & fast loading)
export const EDITORIAL_IMAGES = [
  "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=900&q=65&fm=webp", // St. Peter's / Classical dome
  "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=60&fm=webp", // Capitol building
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=60&fm=webp", // Speaker podium
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=60&fm=webp", // Modern sports car
  "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=600&q=60&fm=webp", // Container shipping
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=60&fm=webp", // GPT Chip & Tech
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=60&fm=webp", // Surgeons healthcare
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=60&fm=webp", // AI tech students
  "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=60&fm=webp", // International politics
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=60&fm=webp", // Esports & culture
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=60&fm=webp", // Modern skyscraper business
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=60&fm=webp", // Coding & software
];


export const CATEGORIES = [
  { name: "CULTURE", color: "indigo" },
  { name: "WORLD NEWS", color: "emerald" },
  { name: "TECHNOLOGY", color: "dark" },
  { name: "BUSINESS", color: "amber" },
  { name: "POLITICS", color: "red" },
  { name: "HEALTH", color: "emerald" },
  { name: "SPORTS", color: "gray" },
];

export const AUTHORS = [
  "Guy Hawkins",
  "Eleanor Vance",
  "Marcus Reed",
  "Sophia Chen",
  "David K. Miller",
  "Julian Thorne",
];

// Fallback posts matching JSONPlaceholder schema in case network is unreachable in WSL
export const FALLBACK_POSTS = [
  {
    userId: 1,
    id: 1,
    title: "A deep dive into the influence of cultural movements on contemporary society",
    body: "Examining foundational dynamics reveals subtle shifts in policy, digital communication, and community engagement across global institutions.",
  },
  {
    userId: 1,
    id: 2,
    title: "The effects of geopolitical shifts on global security frameworks",
    body: "International observers analyze evolving diplomatic alliances and defense alignments reshaping commercial maritime corridors.",
  },
  {
    userId: 1,
    id: 3,
    title: "Affect the integrity and future of professional sports governance",
    body: "Evaluating structural reforms, player welfare policies, and technological surveillance in modern competitive athletic leagues.",
  },
  {
    userId: 2,
    id: 4,
    title: "Strategies for success in a competitive international shipping landscape",
    body: "Supply chain resilience, port automation, and carbon-neutral transit routes dominate multilateral maritime trade agreements.",
  },
  {
    userId: 2,
    id: 5,
    title: "Innovation hubs are transforming traditional business models worldwide",
    body: "From decentralized venture capital to collaborative workspaces, entrepreneurial density accelerates cross-sector breakthroughs.",
  },
  {
    userId: 2,
    id: 6,
    title: "Tailoring clinical treatments to individual genetic patient profiles",
    body: "Genomic sequencing precision medicine offers personalized therapeutic interventions for previously untreatable rare conditions.",
  },
  {
    userId: 3,
    id: 7,
    title: "Understanding the social movements reshaping our world today",
    body: "Grassroots organizing and digital mobilization create unprecedented avenues for civic participation in urban governance.",
  },
  {
    userId: 3,
    id: 8,
    title: "The global financial landscape and its implications for emerging markets",
    body: "Central bank monetary tightening and foreign reserve volatility test domestic market liquidity across developing economies.",
  },
  {
    userId: 3,
    id: 9,
    title: "Examining the environmental challenges and unified responses of nations",
    body: "Renewable infrastructure deployment accelerates as transnational climate accords mandate binding emission reduction targets.",
  },
  {
    userId: 4,
    id: 10,
    title: "A comprehensive analysis of the changing state of global affairs",
    body: "Multilateral summits navigate trade disputes, cyber defense cooperation, and emerging critical resource accessibility.",
  },
  {
    userId: 4,
    id: 11,
    title: "Latest innovations pave the way to a sustainable automotive future",
    body: "Solid-state battery chemistry and autonomous driving algorithms redefine consumer expectations for urban transportation.",
  },
  {
    userId: 4,
    id: 12,
    title: "Understanding the role of big data in driving technological frontiers",
    body: "Generative artificial intelligence models trained on hyperscale architectures unlock novel scientific research capabilities.",
  },
  {
    userId: 5,
    id: 13,
    title: "Exploring the latest developments in AI and intelligent robotics",
    body: "Humanoid robotic prototypes demonstrate dexterity improvements suitable for complex warehouse handling and assisted living.",
  },
  {
    userId: 5,
    id: 14,
    title: "Future of computing and what neuromorphic processors mean for society",
    body: "Energy-efficient bio-inspired computing promises edge intelligence without requiring centralized cloud compute infrastructure.",
  },
];

export function enrichPost(post) {
  const index = (post.id - 1) >= 0 ? (post.id - 1) : 0;
  const categoryObj = CATEGORIES[index % CATEGORIES.length];
  const author = AUTHORS[index % AUTHORS.length];
  const imageUrl = EDITORIAL_IMAGES[index % EDITORIAL_IMAGES.length];
  const readMinutes = ((post.id * 3) % 7) + 3; // 3 to 9 minutes
  const readTime = `${readMinutes < 10 ? "0" : ""}${readMinutes} Minute`;

  return {
    ...post,
    category: categoryObj.name,
    categoryColor: categoryObj.color,
    author,
    imageUrl,
    readTime,
    publishDate: "Sep 9, 2024",
  };
}
