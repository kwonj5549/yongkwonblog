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
    // Use separate state for pagination when in search mode.
    const [page, setPage] = useState(currentPage);

    // When search term changes, reset page to 1.
    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    // Debounce the search term so we don't trigger a request on every keystroke.
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Build the search URL only if there's an active search term.
    const searchUrl = debouncedSearchTerm
        ? `/api/searchPosts?q=${encodeURIComponent(debouncedSearchTerm)}&page=${page}&per_page=9`
        : null;

    // Use SWR to fetch search results; only provide fallbackData if there’s no active search.
    const { data } = useSWR(searchUrl, fetcher, {
        fallbackData: !searchUrl ? { posts, totalPages } : undefined,
        revalidateOnFocus: false,
    });

    // Use API results when search is active; otherwise fallback to passed props.
    const displayedPosts = data?.posts ?? posts;
    // For total pages, if search is active, use the fetched totalPages; otherwise, use fallback.
    const fetchedTotalPages = searchUrl
        ? Number(data?.totalPages) || 0
        : Number(data?.totalPages || totalPages);

    // While in search mode, show a loading indicator if data hasn't loaded yet.
    if (searchUrl && !data) {
        return (
            <div className="container-custom py-16 text-center">
                <p>Loading search results...</p>
            </div>
        );
    }

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
                        {/*
              If no search term is active, render pagination as Next.js Links
              to change routes; if search term is active, use buttons to update state.
            */}
                        {!searchTerm ? (
                            <>
                                {currentPage > 1 && (
                                    <Link href={`/blog/page/${currentPage - 1}`}>
                                        <div className="px-4 py-2 bg-gray-200 rounded transition-colors duration-200 hover:bg-gray-300">
                                            Previous
                                        </div>
                                    </Link>
                                )}
                                {Array.from({ length: fetchedTotalPages }, (_, index) => (
                                    <Link key={index + 1} href={`/blog/page/${index + 1}`}>
                                        <div
                                            className={`px-4 py-2 rounded transition-colors duration-200 ${
                                                currentPage === index + 1
                                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                                    : "bg-gray-200 hover:bg-gray-300"
                                            }`}
                                        >
                                            {index + 1}
                                        </div>
                                    </Link>
                                ))}
                                {currentPage < fetchedTotalPages && (
                                    <Link href={`/blog/page/${currentPage + 1}`}>
                                        <div className="px-4 py-2 bg-gray-200 rounded transition-colors duration-200 hover:bg-gray-300">
                                            Next
                                        </div>
                                    </Link>
                                )}
                            </>
                        ) : (
                            <>
                                {page > 1 && (
                                    <button
                                        onClick={() => setPage(page - 1)}
                                        className="px-4 py-2 bg-gray-200 rounded transition-colors duration-200 hover:bg-gray-300"
                                    >
                                        Previous
                                    </button>
                                )}
                                {Array.from({ length: fetchedTotalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setPage(index + 1)}
                                        className={`px-4 py-2 rounded transition-colors duration-200 ${
                                            page === index + 1
                                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                                : "bg-gray-200 hover:bg-gray-300"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                {page < fetchedTotalPages && (
                                    <button
                                        onClick={() => setPage(page + 1)}
                                        className="px-4 py-2 bg-gray-200 rounded transition-colors duration-200 hover:bg-gray-300"
                                    >
                                        Next
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
