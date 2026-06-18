export interface NotificationItem {
  id: string;
  user: {
    name: string;
    profileImage: any;
  };
  type: 'like' | 'comment' | 'friend_request' | 'mention' | 'group' | 'birthday';
  content: string;
  target?: string;
  timeAgo: string;
  isUnread: boolean;
  section: 'New' | 'Earlier';
}

export const notificationsData: NotificationItem[] = [
  {
    id: 'n1',
    user: {
      name: 'Sarah Parker',
      profileImage: { uri: 'https://randomuser.me/api/portraits/women/44.jpg' },
    },
    type: 'like',
    content: 'reacted to your photo.',
    timeAgo: '15m',
    isUnread: true,
    section: 'New',
  },
  {
    id: 'n2',
    user: {
      name: 'Alex Johnson',
      profileImage: { uri: 'https://randomuser.me/api/portraits/men/32.jpg' },
    },
    type: 'comment',
    content: 'commented on a post you are tagged in:',
    target: '"This is so cool! 🔥"',
    timeAgo: '2h',
    isUnread: true,
    section: 'New',
  },
  {
    id: 'n3',
    user: {
      name: 'Jessica Lee',
      profileImage: { uri: 'https://randomuser.me/api/portraits/women/68.jpg' },
    },
    type: 'friend_request',
    content: 'sent you a friend request.',
    timeAgo: '4h',
    isUnread: false,
    section: 'New',
  },
  {
    id: 'n4',
    user: {
      name: 'Mike Davis',
      profileImage: { uri: 'https://randomuser.me/api/portraits/men/85.jpg' },
    },
    type: 'mention',
    content: 'mentioned you in a comment:',
    target: '"@Sajal you have to see this!"',
    timeAgo: '1d',
    isUnread: false,
    section: 'Earlier',
  },
  {
    id: 'n5',
    user: {
      name: 'React Native Developers',
      profileImage: { uri: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    },
    type: 'group',
    content: 'Emily Davis posted in',
    target: 'React Native Developers',
    timeAgo: '2d',
    isUnread: false,
    section: 'Earlier',
  },
  {
    id: 'n6',
    user: {
      name: 'David Chen',
      profileImage: { uri: 'https://randomuser.me/api/portraits/men/45.jpg' },
    },
    type: 'birthday',
    content: 'It\'s David Chen\'s birthday today.',
    target: 'Wish him a happy birthday!',
    timeAgo: '3d',
    isUnread: false,
    section: 'Earlier',
  },
];
