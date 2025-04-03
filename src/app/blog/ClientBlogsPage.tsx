// src/components/ClientBlogsPage.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import BlogCard from "@/components/BlogCard";

interface ClientBlogsPageProps {
    posts: any[];
    currentPage: number;
    totalPages: number;
}

export default function ClientBlogsPage({
                                            posts,
                                            currentPage,
                                            totalPages,
                                        }: ClientBlogsPageProps) {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter posts by search term.
    const filteredPosts = posts.filter((post) =>
        post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt.rendered && post.excerpt.rendered.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <div className="bg-gray-50 py-16">
                <div className="container-custom">
                    <h1 className="text-4xl font-bold mb-6 text-center">Blog Articles</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center mb-10">
                        Explore our insights on mergers, acquisitions, and corporate finance.
                    </p>
                    <div className="max-w-md mx-auto relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Search size={18} />
                        </div>
                        <Input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
            </div>
            <div className="container-custom py-16">
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold mb-4">No articles found</h2>
                        <p className="text-gray-600">
                            Try different keywords or clear the search to browse all articles.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 space-x-4">
                        {currentPage > 1 && (
                            <Link href={`/blog/page/${currentPage - 1}`}>
                                <button className="px-4 py-2 bg-gray-200 rounded">Previous</button>
                            </Link>
                        )}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Link key={index + 1} href={`/blog/page/${index + 1}`}>
                                <button
                                    className={`px-4 py-2 rounded ${
                                        currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            </Link>
                        ))}
                        {currentPage < totalPages && (
                            <Link href={`/blog/page/${currentPage + 1}`}>
                                <button className="px-4 py-2 bg-gray-200 rounded">Next</button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
