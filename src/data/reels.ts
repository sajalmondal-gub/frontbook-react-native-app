export interface Reel {
  id: string;
  user: {
    id: string;
    name: string;
    profileImage: any;
  };
  videoCover: { uri: string };
  videoUrl: { uri: string };
  description: string;
  likes: string;
  comments: string;
  shares: string;
  musicTrack: string;
}

export const reelsData: Reel[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Sarah Parker',
      profileImage: { uri: 'https://randomuser.me/api/portraits/women/44.jpg' },
    },
    videoCover: { uri: 'https://images.unsplash.com/photo-1516280440502-3c1a40306385?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    videoUrl: { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    description: 'Beautiful sunset at the beach! 🌅✨ #nature #sunset #beachvibes',
    likes: '124K',
    comments: '1,204',
    shares: '4K',
    musicTrack: 'Original Audio - Sarah Parker',
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Alex Johnson',
      profileImage: { uri: 'https://randomuser.me/api/portraits/men/32.jpg' },
    },
    videoCover: { uri: 'https://images.unsplash.com/photo-1551041777-ed277b8dd348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    videoUrl: { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    description: 'Morning coffee routine ☕️ Who else needs coffee to survive? 😂 #coffee #morning',
    likes: '85K',
    comments: '402',
    shares: '1.2K',
    musicTrack: 'Chill Vibes - LoFi HipHop',
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Jessica Lee',
      profileImage: { uri: 'https://randomuser.me/api/portraits/women/68.jpg' },
    },
    videoCover: { uri: 'https://images.unsplash.com/photo-1504609774114-1e233cb17835?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    videoUrl: { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
    description: 'Urban exploration in Tokyo 🗼🇯🇵 #travel #tokyo #japan',
    likes: '250K',
    comments: '3,450',
    shares: '12K',
    musicTrack: 'Tokyo Drift - Teriyaki Boyz',
  },
  {
    id: '4',
    user: {
      id: 'u4',
      name: 'Mike Davis',
      profileImage: { uri: 'https://randomuser.me/api/portraits/men/85.jpg' },
    },
    videoCover: { uri: 'https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    videoUrl: { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    description: 'Workout of the day! 💪 Push yourself! #fitness #motivation #gym',
    likes: '45K',
    comments: '120',
    shares: '340',
    musicTrack: 'Eye of the Tiger - Survivor',
  }
];
