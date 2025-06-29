export const mockProfiles = [
  {
    id: '1',
    username: 'PoetMaster',
    full_name: 'Alexander Verse',
    avatar_url: null,
    bio: 'Crafting verses that touch the soul. Poetry is my language of choice.',
    points: 2450,
    level: 12,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-12-29T10:00:00Z',
    email: 'poetmaster@example.com'
  },
  {
    id: '2',
    username: 'VerseCrafter',
    full_name: 'Maya Wordsmith',
    avatar_url: null,
    bio: 'Weaving words into tapestries of emotion and meaning.',
    points: 2120,
    level: 11,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-12-29T10:00:00Z',
    email: 'versecrafter@example.com'
  },
  {
    id: '3',
    username: 'RhymeWarrior',
    full_name: 'David Stanza',
    avatar_url: null,
    bio: 'Fighting battles with the power of rhyme and rhythm.',
    points: 1890,
    level: 10,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-12-29T10:00:00Z',
    email: 'rhymewarrior@example.com'
  },
  {
    id: '4',
    username: 'WordWeaver',
    full_name: 'Sarah Metaphor',
    avatar_url: null,
    bio: 'Spinning tales through carefully chosen words and imagery.',
    points: 1650,
    level: 9,
    created_at: '2024-02-10T10:00:00Z',
    updated_at: '2024-12-29T10:00:00Z',
    email: 'wordweaver@example.com'
  },
  {
    id: '5',
    username: 'SoulScriber',
    full_name: 'Marcus Ink',
    avatar_url: null,
    bio: 'Writing from the depths of the soul, one verse at a time.',
    points: 1420,
    level: 8,
    created_at: '2024-02-15T10:00:00Z',
    updated_at: '2024-12-29T10:00:00Z',
    email: 'soulscriber@example.com'
  },
  {
    id: '6',
    username: 'MelodyMaker',
    full_name: 'Luna Harmony',
    avatar_url: null,
    bio: 'Creating musical poetry that dances off the page.',
    points: 1280,
    level: 8,
    created_at: '2024-02-20T10:00:00Z',
    updated_at: '2024-12-29T10:00:00Z',
    email: 'melodymaker@example.com'
  },
  {
    id: '7',
    username: 'StanzaStorm',
    full_name: 'Jake Thunder',
    avatar_url: null,
    bio: 'Bringing the storm of creativity to every stanza.',
    points: 1150,
    level: 7,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-12-29T10:00:00Z',
    email: 'stanzastorm@example.com'
  },
  {
    id: '8',
    username: 'InkDancer',
    full_name: 'Aria Flow',
    avatar_url: null,
    bio: 'Dancing through life with ink as my partner.',
    points: 980,
    level: 6,
    created_at: '2024-03-05T10:00:00Z',
    updated_at: '2024-12-29T10:00:00Z',
    email: 'inkdancer@example.com'
  }
];

export const mockThemes = [
  {
    id: '1',
    title: 'Fire: Friend or Foe',
    description: 'Fire can warm our hearts and homes, or destroy everything in its path. Where do you stand?',
    duality_option_1: 'Friend',
    duality_option_2: 'Foe',
    created_by: '1',
    is_active: true,
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: '2024-12-22T10:00:00Z',
    updated_at: '2024-12-22T10:00:00Z',
    participants: 23,
    total_poems: 45
  },
  {
    id: '2',
    title: 'Time: Past or Future',
    description: 'Do we find wisdom in looking back, or hope in looking forward? Choose your temporal allegiance.',
    duality_option_1: 'Past',
    duality_option_2: 'Future',
    created_by: '2',
    is_active: true,
    end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: '2024-12-20T10:00:00Z',
    updated_at: '2024-12-20T10:00:00Z',
    participants: 18,
    total_poems: 31
  },
  {
    id: '3',
    title: 'Ocean: Calm or Storm',
    description: 'The ocean can be a peaceful sanctuary or a raging tempest. Which face speaks to your soul?',
    duality_option_1: 'Calm',
    duality_option_2: 'Storm',
    created_by: '3',
    is_active: false,
    end_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: '2024-12-15T10:00:00Z',
    updated_at: '2024-12-25T10:00:00Z',
    participants: 31,
    total_poems: 67
  },
  {
    id: '4',
    title: 'Dreams: Escape or Reality',
    description: 'Dreams can be a refuge from harsh reality or a glimpse into our deepest truths. Where do your dreams lead?',
    duality_option_1: 'Escape',
    duality_option_2: 'Reality',
    created_by: '4',
    is_active: true,
    end_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: '2024-12-18T10:00:00Z',
    updated_at: '2024-12-18T10:00:00Z',
    participants: 27,
    total_poems: 52
  },
  {
    id: '5',
    title: 'Technology: Helper or Master',
    description: 'Technology surrounds us daily - does it serve humanity or have we become enslaved to its demands?',
    duality_option_1: 'Helper',
    duality_option_2: 'Master',
    created_by: '5',
    is_active: true,
    end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: '2024-12-25T10:00:00Z',
    updated_at: '2024-12-25T10:00:00Z',
    participants: 15,
    total_poems: 28
  },
  {
    id: '6',
    title: 'Silence: Peace or Void',
    description: 'In silence, some find tranquility and meditation, while others discover loneliness and emptiness.',
    duality_option_1: 'Peace',
    duality_option_2: 'Void',
    created_by: '6',
    is_active: false,
    end_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: '2024-12-10T10:00:00Z',
    updated_at: '2024-12-20T10:00:00Z',
    participants: 22,
    total_poems: 41
  }
];

export const mockPoems = [
  {
    id: '1',
    theme_id: '1',
    author_id: '1',
    title: 'Hearth\'s Embrace',
    content: 'Fire dances bright,\nWarming hearts on winter nights,\nFriend to those in need.',
    side: 'option_1' as const,
    likes_count: 45,
    created_at: '2024-12-23T10:00:00Z',
    updated_at: '2024-12-23T10:00:00Z',
    author: { username: 'PoetMaster', avatar_url: null },
    is_liked: false
  },
  {
    id: '2',
    theme_id: '1',
    author_id: '3',
    title: 'Destroyer\'s Path',
    content: 'Flames consume all,\nLeaving ash where dreams once stood,\nFoe of peaceful hearts.',
    side: 'option_2' as const,
    likes_count: 38,
    created_at: '2024-12-23T11:00:00Z',
    updated_at: '2024-12-23T11:00:00Z',
    author: { username: 'RhymeWarrior', avatar_url: null },
    is_liked: false
  },
  {
    id: '3',
    theme_id: '2',
    author_id: '2',
    title: 'Yesterday\'s Wisdom',
    content: 'In memories deep,\nLessons learned through joy and pain,\nPast guides present steps.',
    side: 'option_1' as const,
    likes_count: 42,
    created_at: '2024-12-21T10:00:00Z',
    updated_at: '2024-12-21T10:00:00Z',
    author: { username: 'VerseCrafter', avatar_url: null },
    is_liked: false
  },
  {
    id: '4',
    theme_id: '2',
    author_id: '4',
    title: 'Tomorrow\'s Promise',
    content: 'Future calls ahead,\nPromises of what could be,\nHope\'s eternal flame.',
    side: 'option_2' as const,
    likes_count: 35,
    created_at: '2024-12-21T11:00:00Z',
    updated_at: '2024-12-21T11:00:00Z',
    author: { username: 'WordWeaver', avatar_url: null },
    is_liked: false
  },
  {
    id: '5',
    theme_id: '3',
    author_id: '5',
    title: 'Tranquil Waters',
    content: 'Gentle waves caress,\nPeaceful blue expanse of calm,\nSoul\'s tranquil refuge.',
    side: 'option_1' as const,
    likes_count: 52,
    created_at: '2024-12-16T10:00:00Z',
    updated_at: '2024-12-16T10:00:00Z',
    author: { username: 'SoulScriber', avatar_url: null },
    is_liked: false
  },
  {
    id: '6',
    theme_id: '3',
    author_id: '7',
    title: 'Tempest\'s Rage',
    content: 'Waves crash and roar,\nStorm\'s fury knows no mercy,\nOcean\'s wild heartbeat.',
    side: 'option_2' as const,
    likes_count: 48,
    created_at: '2024-12-16T11:00:00Z',
    updated_at: '2024-12-16T11:00:00Z',
    author: { username: 'StanzaStorm', avatar_url: null },
    is_liked: false
  }
];

export const mockPoemLikes = [
  { id: '1', poem_id: '1', user_id: '2', created_at: '2024-12-23T12:00:00Z' },
  { id: '2', poem_id: '1', user_id: '3', created_at: '2024-12-23T12:30:00Z' },
  { id: '3', poem_id: '1', user_id: '4', created_at: '2024-12-23T13:00:00Z' },
  { id: '4', poem_id: '2', user_id: '1', created_at: '2024-12-23T14:00:00Z' },
  { id: '5', poem_id: '2', user_id: '5', created_at: '2024-12-23T14:30:00Z' },
  { id: '6', poem_id: '3', user_id: '6', created_at: '2024-12-21T15:00:00Z' },
  { id: '7', poem_id: '4', user_id: '7', created_at: '2024-12-21T15:30:00Z' },
  { id: '8', poem_id: '5', user_id: '8', created_at: '2024-12-16T16:00:00Z' },
  { id: '9', poem_id: '6', user_id: '1', created_at: '2024-12-16T16:30:00Z' }
];

export const mockFriendships = [
  {
    id: '1',
    user_id: '1',
    friend_id: '2',
    status: 'accepted' as const,
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-01T10:00:00Z',
    friend: mockProfiles[1]
  },
  {
    id: '2',
    user_id: '1',
    friend_id: '3',
    status: 'accepted' as const,
    created_at: '2024-12-05T10:00:00Z',
    updated_at: '2024-12-05T10:00:00Z',
    friend: mockProfiles[2]
  },
  {
    id: '3',
    user_id: '2',
    friend_id: '4',
    status: 'pending' as const,
    created_at: '2024-12-10T10:00:00Z',
    updated_at: '2024-12-10T10:00:00Z',
    friend: mockProfiles[3]
  }
];

export const mockSocialSuggestions = [
  {
    id: '4',
    username: 'WordWeaver',
    full_name: 'Sarah Metaphor',
    reason: 'Similar writing style',
    points: 1650,
    mutualFriends: 2,
    avatar_url: null
  },
  {
    id: '5',
    username: 'SoulScriber',
    full_name: 'Marcus Ink',
    reason: 'Competed in same battles',
    points: 1420,
    mutualFriends: 1,
    avatar_url: null
  },
  {
    id: '6',
    username: 'MelodyMaker',
    full_name: 'Luna Harmony',
    reason: 'Active in similar themes',
    points: 1280,
    mutualFriends: 3,
    avatar_url: null
  }
];

export const mockActivity = [
  {
    id: '1',
    user: 'PoetMaster',
    action: 'won a battle',
    target: 'Fire: Friend or Foe',
    time: '2 hours ago',
    icon: '🏆'
  },
  {
    id: '2',
    user: 'VerseCrafter',
    action: 'liked your poem',
    target: 'Ocean Dreams',
    time: '4 hours ago',
    icon: '❤️'
  },
  {
    id: '3',
    user: 'RhymeWarrior',
    action: 'started following you',
    target: '',
    time: '6 hours ago',
    icon: '👥'
  },
  {
    id: '4',
    user: 'WordWeaver',
    action: 'created a new battle',
    target: 'Dreams: Escape or Reality',
    time: '8 hours ago',
    icon: '⚔️'
  },
  {
    id: '5',
    user: 'SoulScriber',
    action: 'submitted a poem',
    target: 'Tranquil Waters',
    time: '12 hours ago',
    icon: '📝'
  },
  {
    id: '6',
    user: 'MelodyMaker',
    action: 'joined the battle',
    target: 'Technology: Helper or Master',
    time: '1 day ago',
    icon: '⚔️'
  }
];