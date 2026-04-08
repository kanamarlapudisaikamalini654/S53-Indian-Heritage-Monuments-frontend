// 1. Monuments Data
export const monuments = [
  {
    id: 1,
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    region: "North",
    era: "Mughal Era",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
    shortDesc: "An ivory-white marble mausoleum and a symbol of eternal love."
  },
  {
    id: 2,
    name: "Red Fort",
    location: "Delhi",
    region: "North",
    era: "Mughal Era",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    shortDesc: "Main residence of the Mughal Emperors for nearly 200 years."
  }
];

// 2. Blog Data (THIS WAS THE MISSING PIECE!)
export const blogs = [
  {
    id: 1,
    title: "The Architecture of Ancient India",
    author: "K. Sai Kamalini",
    date: "2026-04-04",
    excerpt: "Exploring the stone carvings of Hampi and the symmetry of the Taj.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80"
  },
  {
    id: 2,
    title: "Virtual Tours: The Future of Tourism",
    author: "Zafeer",
    date: "2026-04-02",
    excerpt: "How 360-degree views are changing how we see the world.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80"
  }
];

// 3. Team Members Data (Updated with Zafeer)
export const teamMembers = [
  { 
    name: "K. Sai Kamalini", 
    role: "Project Lead & Full Stack Dev", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kamalini" 
  },
  { 
    name: "A. Divya Sri", 
    role: "UI/UX Designer", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Divya" 
  },
  { 
    name: "Zafeer", 
    role: "Backend Architect", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zafeer" 
  }
];

// 4. Quiz Questions Data
export const quizQuestions = [
  {
    id: 1,
    question: "Which Mughal Emperor built the Taj Mahal?",
    options: ["Akbar", "Shah Jahan", "Aurangzeb", "Jahangir"],
    answer: 1
  }
];

// 5. Virtual Tour Data
export const virtualTours = [
  {
    id: 1,
    monumentId: 1,
    name: "Taj Mahal Virtual Experience",
    stops: [
      { title: "Main Gateway", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80" }
    ]
  }
];