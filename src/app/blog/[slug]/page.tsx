// src/app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, WPPost } from "@/lib/wordpress";
import BackButton from "@/components/BackButton";
import Newsletter from "@/components/Newsletter";
import Image from "next/image";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const posts = await getAllPosts();
    return posts.map((post: WPPost) => ({ slug: post.slug }));
}

export default async function BlogPage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}) {
    // 1. Await the params
    const { slug } = await params;

    const post = await getPostBySlug(slug);
    if (!post) {
        notFound();
    }

    // 2. Format date as "Sep 23, 2023"
    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    // 3. Compute reading time
    //    Strip HTML tags, split by whitespace, and calculate minutes
    const contentText = post.content.rendered.replace(/<[^>]+>/g, "");
    const wordCount = contentText.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    // 4. Extract category name if needed
    const categoryName =
        post._embedded?.["wp:term"]?.find((group) => group[0]?.taxonomy === "category")?.[0]?.name ||
        "Category";

    // 5. Find related posts
    const allPosts = await getAllPosts();
    const relatedPosts = allPosts
        .filter((p: WPPost) => {
            const pCategory =
                p._embedded?.["wp:term"]?.find((group) => group[0]?.taxonomy === "category")?.[0]?.name ||
                "Category";
            return pCategory === categoryName && p.id !== post.id;
        })
        .slice(0, 3);

    return (
        <div>
            <div className="container-custom py-12">
                <BackButton />

                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        {/* Top row with reading time & date */}
                        <div className="flex pl-1.5 items-center gap-2 text-sm text-gray-500 mb-4">
                            <span>{readingTime} min read</span>
                            <span>•</span>
                            <span>{formattedDate}</span>
                        </div>

                        {/* Title */}
                        <h1
                            className="text-4xl font-bold mb-2"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        {/* Blog excerpt */}
                        <h2
                            className="text-lg pl-1 font-bold mb-8"
                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                        />
                        {/* Author row */}
                        <div className="flex items-center mb-6">
                            <Image
                                src="/YongKwonProfile.png"
                                alt="Yong Kwon"
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <div className="font-medium">Yong Kwon</div>
                                <div className="text-sm text-gray-500">Author</div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="container-custom max-w-3xl mx-0 px-0 mb-4">
                        <img
                            src={post.jetpack_featured_media_url || "/fallback.jpg"}
                            alt={post.title.rendered}
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Blog content */}
                    <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                    />

                    {/* Categories (optional) */}
                    <div className="my-10 pt-10 border-t">
                        <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {categoryName}
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
                            {relatedPosts.map((relatedPost: WPPost) => {
                                const relatedCategory =
                                    relatedPost._embedded?.["wp:term"]?.find((group) => group[0]?.taxonomy === "category")?.[0]
                                        ?.name || "Category";

                                return (
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
                                            <p
                                                className="text-gray-600 text-sm line-clamp-2"
                                                dangerouslySetInnerHTML={{
                                                    __html: relatedPost.excerpt.rendered,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <Newsletter />
        </div>
    );
}
