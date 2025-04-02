// src/app/blog/ClientBlogsPage.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import BlogCard from "@/components/BlogCard";

export default function ClientBlogsPage({ posts }: { posts: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    // Filter posts based on the search term.
    const filteredPosts = posts.filter((post) =>
        post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt.rendered && post.excerpt.rendered.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Calculate the total number of pages.
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    // Get the posts for the current page.
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
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
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to page 1 on new search
                            }}
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
                        {paginatedPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 space-x-4">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`px-4 py-2 rounded ${
                                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
