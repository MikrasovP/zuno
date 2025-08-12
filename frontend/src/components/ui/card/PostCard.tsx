import { CardImage } from './CardImage';
import { CardAuthor } from './CardAuthor';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    description: string;
    author: {
      username: string;
      imageSrc?: string;
    };
    imageSrc?: string;
  };
}

export function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden hover:shadow-lg transition-shadow bg-card rounded-lg border border-border cursor-pointer"
      onClick={() => {
        navigate(`/post/${post.id}`);
      }}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="flex justify-center pt-2 pb-2 pl-4 pr-4">
        <CardImage
          src={post.imageSrc}
          alt={post.title}
        />
      </div>

      {/* Content section with fixed height and overflow handling */}
      <div className="p-2 h-[120px] overflow-hidden">
        <h3 className="text-xl font-semibold mb-2 text-foreground line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 italic">
          {post.description}
        </p>
      </div>

      {/* Author section */}
      <div className="p-4 pt-0">
        <CardAuthor author={post.author} />
      </div>
    </div>
  );
} 