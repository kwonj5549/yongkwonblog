"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import BackButton from "@/components/BackButton";
import Newsletter from "@/components/Newsletter";
import Image from "next/image";
import { WPPost } from "@/lib/wordpress";

interface BlogContentProps {
    englishPost: WPPost | null;
    koreanPost: WPPost | null;
    englishAllPosts: WPPost[];
    koreanAllPosts: WPPost[];
}

const BlogContent: React.FC<BlogContentProps> = ({
                                                     englishPost,
                                                     koreanPost,
                                                     englishAllPosts,
                                                     koreanAllPosts,
                                                 }) => {
    const { language } = useLanguage();

    // Choose the post and allPosts based on language.
    const post = language === "ko" ? koreanPost : englishPost;
    const allPosts = language === "ko" ? koreanAllPosts : englishAllPosts;

    if (!post) {
        return <div>Post not found</div>;
    }

    // Always use the English post for categories (if available)
    let categoryName = "Category";
    if (englishPost && englishPost._embedded?.["wp:term"]) {
        categoryName =
            englishPost._embedded["wp:term"].find(
                (group) => group[0]?.taxonomy === "category"
            )?.[0]?.name || "Category";
    } else if (language === "ko") {
        categoryName = "카테고리";
    }

    // Determine which fields to render.
    const titleRendered = language === "ko" ? post.translatedTitle : post.title?.rendered;
    const excerptRendered = language === "ko" ? post.translatedExcerpt : post.excerpt?.rendered;
    const contentRendered = language === "ko" ? post.translatedContent : post.content?.rendered;

    const safeTitle = titleRendered ?? "";
    const safeExcerpt = excerptRendered ?? "";
    const safeContent = contentRendered ?? "";

    // Format the post date.
    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    // Compute reading time (assuming 200 words per minute).
    const contentText = safeContent.replace(/<[^>]+>/g, "");
    const wordCount = contentText.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Find related posts.
    let relatedPosts: WPPost[] = [];
    if (language === "en") {
        relatedPosts = allPosts
            .filter((p: WPPost) => {
                const pCategory =
                    p._embedded?.["wp:term"]?.find((group) => group[0]?.taxonomy === "category")?.[0]?.name || "Category";
                return pCategory === categoryName && p.id !== post.id;
            })
            .slice(0, 3);
    } else {
        relatedPosts = allPosts
            .filter((p: WPPost) => p.wordpressId !== post.wordpressId)
            .slice(0, 3);
    }

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
                            suppressHydrationWarning
                            dangerouslySetInnerHTML={{ __html: safeTitle }}
                        />
                        {/* Excerpt */}
                        <h2
                            className="text-lg pl-1 font-bold mb-8"
                            suppressHydrationWarning
                            dangerouslySetInnerHTML={{ __html: safeExcerpt }}
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
                    {/* Featured image */}
                    <div className="container-custom max-w-3xl mx-0 px-0 mb-4">
                        <img
                            src={post.jetpack_featured_media_url || undefined}
                            alt={safeTitle}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    {/* Blog content */}
                    <div
                        className={`blog-content ${language === "ko" ? "korean-text" : ""}`}
                        suppressHydrationWarning
                        dangerouslySetInnerHTML={{ __html: safeContent }}
                    />
                    {/* Categories */}
                    <div className="my-10 pt-10 border-t">
                        <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {categoryName}
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
                                const relatedTitle =
                                    language === "ko" && relatedPost.translatedTitle
                                        ? relatedPost.translatedTitle
                                        : relatedPost.title?.rendered ?? "";
                                const relatedExcerpt =
                                    language === "ko" && relatedPost.translatedExcerpt
                                        ? relatedPost.translatedExcerpt
                                        : relatedPost.excerpt?.rendered ?? "";
                                return (
                                    <div
                                        key={relatedPost.id || relatedPost.wordpressId}
                                        className="border rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                                    >
                                        <img
                                            src={relatedPost.jetpack_featured_media_url || undefined}
                                            alt={relatedTitle}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                      <span className="text-sm text-gray-500 mb-2 block">
                        {new Date(relatedPost.date).toLocaleDateString()}
                      </span>
                                            <h3 className="font-bold text-lg mb-2 hover:text-blue-600 transition-colors">
                                                <a href={`/blog/${relatedPost.slug}`}>{relatedTitle}</a>
                                            </h3>
                                            <p
                                                className="text-gray-600 text-sm line-clamp-2"
                                                suppressHydrationWarning
                                                dangerouslySetInnerHTML={{ __html: relatedExcerpt }}
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
};

export default BlogContent;
