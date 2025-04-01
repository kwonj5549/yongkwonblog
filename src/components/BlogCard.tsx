import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  category: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return (
    <Card className={`overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow ${featured ? 'lg:flex' : ''}`}>
      <div className={`${featured ? 'lg:w-1/2' : 'w-full'}`}>
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="h-64 w-full object-cover"
        />
      </div>
      <div className={`${featured ? 'lg:w-1/2' : 'w-full'}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="mb-2">
              {post.category}
            </Badge>
            <span className="text-sm text-gray-500">{post.date}</span>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-bold hover:text-blue-600 transition-colors line-clamp-2`}>
              {post.title}
            </h3>
          </Link>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center pt-0">
          <img
            src={post.author.avatarUrl}
            alt={post.author.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm text-gray-600">{post.author.name}</span>
        </CardFooter>
      </div>
    </Card>
  );
};

export default BlogCard;
