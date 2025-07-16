export interface PostPreview {
    id: string;
    title: string;
    description: string;
    author: {
        username: string;
        imageSrc: string;
    };
    publishedTimestamp: number;
    imageSrc?: string;
}


export const mockPosts: PostPreview[] = [
    {
        id: '1',
        title: 'Post 1',
        description: 'This is the first post',
        author: { username: 'john_doe', imageSrc: '/defaultAvatar.svg' },
        publishedTimestamp: 1715769600,
        imageSrc: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
    },  
    {
        id: '2',
        title: 'Post 2',
        description: 'This is the second post. Text is a little bit longer.',
        author: { username: 'pavel_nekrasov', imageSrc: '/defaultAvatar.svg' },
        publishedTimestamp: 1715769600,
        imageSrc: 'https://via.placeholder.com/150',
    },
    {
        id: '3',
        title: 'Post 3',
        description: 'This is the third post. Text is a little bit longer.',
        author: { username: 'pavel_nekrasov', imageSrc: '/defaultAvatar.svg' },
        publishedTimestamp: 1715769600,
        imageSrc: 'https://via.placeholder.com/150',
    },
    {
        id: '4',
        title: 'Post 4',
        description: 'This is the fourth post. Text is a little bit longer.',
        author: { username: 'pavel_nekrasov', imageSrc: '/defaultAvatar.svg' },
        publishedTimestamp: 1715769600,
        imageSrc: 'https://via.placeholder.com/150',
    },
]