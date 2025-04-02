// src/app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, WPPost } from "@/lib/wordpress";
import BackButton from "@/components/BackButton";
import Newsletter from "@/components/Newsletter";

// Optional: Generate static paths for pre-rendering
export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post: WPPost) => ({ slug: post.slug }));
}

interface BlogPageProps {
    params: Promise<{ slug: string }> | { slug: string };
}

export default async function BlogPage({ params }: BlogPageProps) {
    // Await params if they are a promise
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // For a simple related posts example, we fetch all posts and filter by matching category.
    const allPosts = await getAllPosts();
    const relatedPosts = allPosts
        .filter((p: WPPost) => p.categories && p.categories[0] === post.categories?.[0] && p.id !== post.id)
        .slice(0, 3);

    return (
        <div>
            {/* Featured image */}
            <div className="w-full h-96 relative">
                <img
                    src={post.jetpack_featured_media_url || ""}
                    alt={post.title.rendered}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>

            <div className="container-custom py-12">
                <BackButton />
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="inline-flex items-center gap-1">
                {/* You can add a Calendar icon here if desired */}
                  {new Date(post.date).toLocaleDateString()}
              </span>
                            <span className="inline-flex items-center gap-1">
                {/* You can add a User icon here if desired */}
                                {post.author_name || "Author"}
              </span>
                        </div>

                        <h1 className="text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

                        <div className="flex items-center mb-6">
                            <img
                                src={post.author_avatar_urls ? post.author_avatar_urls["48"] : ""}
                                alt={post.author_name || "Author"}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <div className="font-medium">{post.author_name || "Author"}</div>
                                <div className="text-sm text-gray-500">Author</div>
                            </div>
                        </div>
                    </div>

                    {/* Blog content */}
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

                    {/* Tags / Categories */}
                    <div className="my-10 pt-10 border-t">
                        <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {post.categories && post.categories[0] ? `Category ${post.categories[0]}` : "Category"}
              </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                M&A
              </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                Corporate Finance
              </span>
                        </div>
                    </div>
                </div>

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-8 text-center">Related Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost: WPPost) => (
                                <div
                                    key={relatedPost.id}
                                    className="border rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                                >
                                    <img
                                        src={relatedPost.jetpack_featured_media_url || ""}
                                        alt={relatedPost.title.rendered}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                    <span className="text-sm text-gray-500 mb-2 block">
                      {new Date(relatedPost.date).toLocaleDateString()}
                    </span>
                                        <h3 className="font-bold text-lg mb-2 hover:text-blue-600 transition-colors">
                                            <a href={`/blog/${relatedPost.slug}`}>
                                                {relatedPost.title.rendered}
                                            </a>
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: relatedPost.excerpt.rendered }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Newsletter />
        </div>
    );
}
