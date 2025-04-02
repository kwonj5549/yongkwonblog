import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";
import he from "he";

export interface BlogPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  jetpack_featured_media_url: string; // Use this property for the featured image URL.
  _embedded?: {
    "wp:term"?: Array<
        Array<{
          id: number;
          name: string;
          taxonomy: string;
        }>
    >;
  };
  author: {
    name: string;
    avatarUrl: string;
  };
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
  children?: React.ReactNode;
}

const BlogCard = ({ post, children }: BlogCardProps) => {
  // Get the first category name from the embedded wp:term array, or default to "Category".
  const categoryName =
      post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Category";

  // Use the jetpack_featured_media_url for the image.
  const imageUrl = post.jetpack_featured_media_url;

  return (
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
        {/* IMAGE SIDE */}
        <div className="relative w-full h-64">
          <Image
              src={imageUrl}
              alt={post.title.rendered}
              fill
              className="object-cover object-top"
          />
        </div>

        {/* TEXT SIDE */}
        <div className="w-full">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="mb-2">
                {he.decode(categoryName)}
              </Badge>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-xl font-bold hover:text-blue-600 transition-colors line-clamp-2">
                {he.decode(post.title.rendered)}
              </h3>
            </Link>
          </CardHeader>
          <CardContent>
            <p
                className="text-gray-600 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          </CardContent>
          {children && <div className="p-4">{children}</div>}
          <CardFooter className="flex items-center pt-0">
            <Image
                src="/YongKwonProfile.png"
                alt="Yong Kwon"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600">Yong Kwon</span>
          </CardFooter>
        </div>
      </Card>
  );
};

export default BlogCard;
