// Mock Data for StreamForge

export const CATEGORIES = [
  'All',
  'Gaming',
  'Music',
  'Technology',
  'Education',
  'Sports',
  'News',
  'Movies',
  'Live Streams'
];

export const CHANNELS = [
  {
    id: 'ch-forge-gaming',
    name: 'Forge Gaming',
    handle: '@forge_gaming',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    subscribers: 1450000,
    videoCount: 342,
    description: 'The ultimate forge for all things gaming. Let\'s play walkthroughs, game reviews, esports analysis, and live hardware test streams.',
    joinedDate: 'Jan 15, 2019'
  },
  {
    id: 'ch-soundwave',
    name: 'SoundWave Music',
    handle: '@soundwave_music',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    subscribers: 2890000,
    videoCount: 189,
    description: 'Bringing you deep electronic beats, ambient soundscapes, lo-fi tracks, and high-energy music videos from top independent artists.',
    joinedDate: 'Mar 22, 2018'
  },
  {
    id: 'ch-tech-nexus',
    name: 'Tech Nexus',
    handle: '@technexus',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    subscribers: 4200000,
    videoCount: 512,
    description: 'Unboxing the future. Detailed technology reviews, coding tutorials, AI deep-dives, developer setups, and future tech concepts.',
    joinedDate: 'Nov 02, 2017'
  },
  {
    id: 'ch-curious-mind',
    name: 'Curious Mind Academy',
    handle: '@curious_mind',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&auto=format&fit=crop&q=80',
    subscribers: 890000,
    videoCount: 224,
    description: 'An educational hub for science, physics, history, and astronomy. Making the complex cosmos simple and fun to understand.',
    joinedDate: 'May 10, 2020'
  },
  {
    id: 'ch-velocity-sports',
    name: 'Velocity Sports',
    handle: '@velocity_sports',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80',
    subscribers: 1800000,
    videoCount: 461,
    description: 'High-adrenaline sports coverage. Football highlights, skateboarding stunts, extreme parkour, and professional training tips.',
    joinedDate: 'Jul 30, 2016'
  }
];

export const VIDEOS = [
  {
    id: 'vid-1',
    title: 'The Future of Gaming: Unreal Engine 5.5 Visual Showcase',
    description: 'Take a look at what the next generation of video games will look like. Exploring nanite displacement, custom lumen reflections, and real-time environment physics in a cinematic 60fps showcase.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.webm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80',
    duration: '10:53',
    views: 1240000,
    likes: 85000,
    dislikes: 1200,
    uploadedAt: '2 days ago',
    category: 'Gaming',
    channelId: 'ch-forge-gaming',
    isFeatured: true,
    isTrending: true,
    comments: [
      {
        id: 'c1',
        userName: 'Alex Mercer',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        text: 'The graphics look absolutely mind-blowing. I cannot wait to play games that look like this!',
        timestamp: '1 day ago',
        likes: 142
      },
      {
        id: 'c2',
        userName: 'Sarah Connor',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        text: 'Unreal Engine is pushing boundaries like nothing else. Excellent breakdown of lumen lighting!',
        timestamp: '18 hours ago',
        likes: 89
      }
    ]
  },
  {
    id: 'vid-2',
    title: 'Coding a YouTube Clone in React from Scratch (No Tailwind)',
    description: 'A comprehensive step-by-step masterclass on building a fully responsive React video streaming application using custom CSS. We will cover React Hooks, routing, state management, and modern design interfaces.',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    duration: '15:20',
    views: 320000,
    likes: 24000,
    dislikes: 150,
    uploadedAt: '5 days ago',
    category: 'Technology',
    channelId: 'ch-tech-nexus',
    isFeatured: false,
    isTrending: true,
    comments: [
      {
        id: 'c3',
        userName: 'David Miller',
        userAvatar: 'https://images.unsplash.com/photo-1527983359383-4758693f760c?w=100&auto=format&fit=crop&q=80',
        text: 'Pure CSS styling is so satisfying to watch. Thanks for showing how to structure layout flexboxes correctly.',
        timestamp: '3 days ago',
        likes: 210
      },
      {
        id: 'c4',
        userName: 'Emily Blunt',
        userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
        text: 'This is the best React UI design tutorial on the internet. Instantly subscribed!',
        timestamp: '2 days ago',
        likes: 67
      }
    ]
  },
  {
    id: 'vid-3',
    title: 'Cyberpunk Synthwave Mix 2026 - Beats to Hack/Code To',
    description: 'A compilation of electronic beats, heavy synthwaves, and retro beats perfect for deep work sessions, coding, or late night driving. Visuals rendered in Unreal Engine.',
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.webm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    duration: '12:15',
    views: 840000,
    likes: 42000,
    dislikes: 300,
    uploadedAt: '1 week ago',
    category: 'Music',
    channelId: 'ch-soundwave',
    isFeatured: false,
    isTrending: false,
    comments: [
      {
        id: 'c5',
        userName: 'Neo Tech',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
        text: 'This mix literally single-handedly got me through my compilation errors. Pure gold.',
        timestamp: '5 days ago',
        likes: 312
      }
    ]
  },
  {
    id: 'vid-4',
    title: 'The Quantum Physics of Parallel Universes Explained',
    description: 'Are there infinite copies of you in parallel dimensions? We dive deep into quantum mechanics, the double-slit experiment, quantum entanglement, and the Many-Worlds Interpretation.',
    videoUrl: 'https://www.w3schools.com/html/movie.webm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    duration: '14:40',
    views: 450000,
    likes: 38000,
    dislikes: 420,
    uploadedAt: '3 days ago',
    category: 'Education',
    channelId: 'ch-curious-mind',
    isFeatured: true,
    isTrending: false,
    comments: [
      {
        id: 'c6',
        userName: 'Isaac N.',
        userAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
        text: 'The animation explaining quantum superposition was so intuitive. Science channel of the year.',
        timestamp: '2 days ago',
        likes: 95
      }
    ]
  },
  {
    id: 'vid-5',
    title: 'Extreme Downhill Mountain Biking - GoPro Red Bull Ride',
    description: 'Experience the world\'s most dangerous downhill bike tracks through a first-person GoPro view. Speeds exceeding 70km/h on narrow mountain ridges with vertical drops.',
    videoUrl: 'https://media.w3.org/2010/05/bunny/trailer.webm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    duration: '08:12',
    views: 1980000,
    likes: 120000,
    dislikes: 1800,
    uploadedAt: '1 month ago',
    category: 'Sports',
    channelId: 'ch-velocity-sports',
    isFeatured: false,
    isTrending: true,
    comments: [
      {
        id: 'c7',
        userName: 'John Doe',
        userAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
        text: 'My hands were sweating just watching this. The level of skill is unbelievable.',
        timestamp: '3 weeks ago',
        likes: 420
      }
    ]
  },
  {
    id: 'vid-6',
    title: 'Deep Ambient Lo-Fi for Late Night Productive Coding',
    description: 'Chill, relaxing melodies designed to ease stress and improve cognitive focus. Perfect for programming, writing, drafting, or studying in dark rooms.',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/OpenAI_Sora_in_Action-_Tokyo_Walk.webm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80',
    duration: '18:30',
    views: 950000,
    likes: 56000,
    dislikes: 200,
    uploadedAt: '3 weeks ago',
    category: 'Music',
    channelId: 'ch-soundwave',
    isFeatured: false,
    isTrending: false,
    comments: []
  },
  {
    id: 'vid-7',
    title: 'How SpaceX Starship is Re-engineering Space Travel',
    description: 'We analyze the physics of SpaceX Starship, its Raptor 3 engines, and the hot-staging ring technology. Can Starship make humanity multiplanetary in our lifetime?',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Jellyfish_in_a_aquarium.webm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&auto=format&fit=crop&q=80',
    duration: '11:42',
    views: 1100000,
    likes: 72000,
    dislikes: 890,
    uploadedAt: '6 days ago',
    category: 'Technology',
    channelId: 'ch-tech-nexus',
    isFeatured: false,
    isTrending: false,
    comments: []
  },
  {
    id: 'vid-8',
    title: 'The AI Revolution: What 2026 Looks Like (GPT-5 & Beyond)',
    description: 'A deep look into agentic workflows, artificial general intelligence (AGI) timelines, humanoid robotics, and how neural interfaces are merging with developer ecosystems.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.webm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    duration: '09:15',
    views: 650000,
    likes: 49000,
    dislikes: 600,
    uploadedAt: '4 days ago',
    category: 'Technology',
    channelId: 'ch-tech-nexus',
    isFeatured: false,
    isTrending: true,
    comments: []
  },
  {
    id: 'vid-9',
    title: 'World Cup Skateboarding Final Highlights: Tokyo 2026',
    description: 'Watch the best moments, tricks, and gold-medal runs from the men\'s street skateboarding finals. Incredibly technical rail slides and vertical jumps.',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800&auto=format&fit=crop&q=80',
    duration: '06:50',
    views: 740000,
    likes: 31000,
    dislikes: 400,
    uploadedAt: '1 week ago',
    category: 'Sports',
    channelId: 'ch-velocity-sports',
    isFeatured: false,
    isTrending: false,
    comments: []
  },
  {
    id: 'vid-10',
    title: '[LIVE] Forge Gaming Cup - CS2 Grand Finals 2026',
    description: 'Live broadcast of the grand finals match between Team Titan and Forge Gaming. Top-tier tactical shooter action with full casting and commentary.',
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.webm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    duration: '00:00',
    views: 45000,
    likes: 12000,
    dislikes: 210,
    uploadedAt: 'LIVE NOW',
    category: 'Live Streams',
    channelId: 'ch-forge-gaming',
    isLive: true,
    comments: []
  },
  {
    id: 'vid-11',
    title: 'A Brief History of Ancient Civilizations: Mesopotamia',
    description: 'Travel back 6000 years to examine the birth of agriculture, written language, math, and astronomy in the fertile crescent between the Tigris and Euphrates.',
    videoUrl: 'https://www.w3schools.com/html/movie.webm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    duration: '16:04',
    views: 380000,
    likes: 21000,
    dislikes: 300,
    uploadedAt: '12 days ago',
    category: 'Education',
    channelId: 'ch-curious-mind',
    isFeatured: false,
    isTrending: false,
    comments: []
  },
  {
    id: 'vid-12',
    title: 'Chronicles of the Forge - Official Movie Trailer (2026)',
    description: 'The official trailer for the highly anticipated sci-fi epic. A lone blacksmith in a cybernetic future discovers an ancient blueprint that changes the fate of human colonies.',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/OpenAI_Sora_in_Action-_Tokyo_Walk.webm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    duration: '02:30',
    views: 2400000,
    likes: 180000,
    dislikes: 2500,
    uploadedAt: '2 weeks ago',
    category: 'Movies',
    channelId: 'ch-forge-gaming',
    isFeatured: false,
    isTrending: false,
    comments: []
  }
];

export const MOCK_USER = {
  name: 'Alex Forge',
  handle: '@alex_forge',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  subscribers: 0,
  description: 'Regular user account of StreamForge platform. Building cool interfaces and playlists!'
};
