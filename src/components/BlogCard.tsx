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
  jetpack_featured_media_url: string;
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
  // Extract all category terms from embedded data
  const categories =
      post._embedded?.["wp:term"]?.flat().filter((term) => term.taxonomy === "category") || [];

  // Use the jetpack_featured_media_url for the image.
  const imageUrl = post.jetpack_featured_media_url;
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

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
              {/* Render all categories if any exist */}
              {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {categories.map((term) => (
                        <Badge key={term.id} variant="secondary">
                          {he.decode(term.name)}
                        </Badge>
                    ))}
                  </div>
              )}
              <span className="text-sm text-gray-500">{formattedDate}</span>
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
