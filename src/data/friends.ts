export interface FriendInfo {
  id: string;
  name: string;
  profileImage: { uri: string } | any;
  mutualFriends: number;
  timeAgo?: string;
}

export const friendRequests: FriendInfo[] = [
  {
    id: 'req1',
    name: 'Amanda Brooks',
    profileImage: { uri: 'https://randomuser.me/api/portraits/women/12.jpg' },
    mutualFriends: 14,
    timeAgo: '2w',
  },
  {
    id: 'req2',
    name: 'David Chen',
    profileImage: { uri: 'https://randomuser.me/api/portraits/men/45.jpg' },
    mutualFriends: 3,
    timeAgo: '3d',
  },
  {
    id: 'req3',
    name: 'Sarah Wilson',
    profileImage: { uri: 'https://randomuser.me/api/portraits/women/65.jpg' },
    mutualFriends: 21,
    timeAgo: '1w',
  },
];

export const friendSuggestions: FriendInfo[] = [
  {
    id: 'sug1',
    name: 'Michael Scott',
    profileImage: { uri: 'https://randomuser.me/api/portraits/men/22.jpg' },
    mutualFriends: 5,
  },
  {
    id: 'sug2',
    name: 'Emily Davis',
    profileImage: { uri: 'https://randomuser.me/api/portraits/women/33.jpg' },
    mutualFriends: 12,
  },
  {
    id: 'sug3',
    name: 'James Rodriguez',
    profileImage: { uri: 'https://randomuser.me/api/portraits/men/55.jpg' },
    mutualFriends: 8,
  },
  {
    id: 'sug4',
    name: 'Jessica Taylor',
    profileImage: { uri: 'https://randomuser.me/api/portraits/women/42.jpg' },
    mutualFriends: 2,
  },
  {
    id: 'sug5',
    name: 'William Martinez',
    profileImage: { uri: 'https://randomuser.me/api/portraits/men/11.jpg' },
    mutualFriends: 19,
  },
];
