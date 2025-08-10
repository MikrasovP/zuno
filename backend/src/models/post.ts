export interface PostDto {
  id: string;
  title: string;
  description: string;
  author: {
    username: string;
    imageSrc: string;
  };
  publishedTimestamp: number;
  imageSrc?: string;
  content: string;
}

export interface CreatePostData {
  title: string;
  description: string;
  content: string;
  imageSrc?: string;
}