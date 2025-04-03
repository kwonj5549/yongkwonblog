// src/components/ClientBlogsPage.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import BlogCard from "@/components/BlogCard";

// Simple SWR fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Debounce hook to delay search queries until the user stops typing
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

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
    const [page, setPage] = useState(currentPage);

    // Reset page to 1 whenever search term changes.
    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    // Debounce the search term.
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // If a search term exists, build the API URL. Otherwise, use fallback data.
    const searchUrl = debouncedSearchTerm
        ? `/api/searchPosts?q=${encodeURIComponent(debouncedSearchTerm)}&page=${page}&per_page=9`
        : null;

    // Use SWR to fetch search results; provide fallbackData only when no search term is active.
    const { data } = useSWR(searchUrl, fetcher, {
        fallbackData: !searchUrl ? { posts, totalPages } : undefined,
        revalidateOnFocus: false,
    });

    // While in search mode, show a loading indicator if data hasn't loaded yet.
    if (searchUrl && !data) {
        return (
            <div className="container-custom py-16 text-center">
                <p>Loading search results...</p>
            </div>
        );
    }

    const displayedPosts = data?.posts || [];
    const fetchedTotalPages = Number(data?.totalPages || totalPages);

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
                {displayedPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold mb-4">No articles found</h2>
                        <p className="text-gray-600">
                            Try different keywords or clear the search to browse all articles.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedPosts.map((post: any) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                {fetchedTotalPages > 1 && (
                    <div className="flex justify-center mt-8 space-x-4">
                        {page > 1 && (
                            <button
                                onClick={() => setPage(page - 1)}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Previous
                            </button>
                        )}
                        {Array.from({ length: fetchedTotalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setPage(index + 1)}
                                className={`px-4 py-2 rounded ${
                                    page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        {page < fetchedTotalPages && (
                            <button
                                onClick={() => setPage(page + 1)}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Next
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
