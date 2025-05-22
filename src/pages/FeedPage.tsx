import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { format } from 'date-fns';

// Mock data type
interface Post {
  id: string;
  title: string;
  description: string;
  author: {
    username: string;
    name: string;
  };
  publishedAt: string;
  tags: string[];
  thumbnail?: string;
}

// Mock data
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with TypeScript and React',
    description: 'A comprehensive guide to using TypeScript with React, including best practices and common pitfalls to avoid.',
    author: {
      username: 'techie',
      name: 'Sarah Johnson'
    },
    publishedAt: '2024-05-20T10:00:00Z',
    tags: ['typescript', 'react', 'frontend'],
    thumbnail: 'https://picsum.photos/seed/1/800/400'
  },
  {
    id: '2',
    title: 'Building Scalable APIs with Node.js',
    description: 'Learn how to create robust and scalable backend services using Node.js and Express.',
    author: {
      username: 'backend_dev',
      name: 'Mike Chen'
    },
    publishedAt: '2024-05-19T15:30:00Z',
    tags: ['nodejs', 'backend', 'api'],
    thumbnail: 'https://picsum.photos/seed/2/800/400'
  },
  {
    id: '3',
    title: 'The Future of Web Development',
    description: 'Exploring upcoming trends and technologies that will shape the future of web development.',
    author: {
      username: 'webdev_guru',
      name: 'Alex Thompson'
    },
    publishedAt: '2024-05-18T09:15:00Z',
    tags: ['webdev', 'trends', 'future'],
    thumbnail: 'https://picsum.photos/seed/3/800/400'
  }
];

export default function FeedPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-foreground">Latest Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPosts.map((post) => (
          <Link key={post.id} to={`/u/${post.author.username}/${post.id}`}>
            <Card className="h-full hover:shadow-md transition-shadow">
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  by {post.author.name} • {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.description}</p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 