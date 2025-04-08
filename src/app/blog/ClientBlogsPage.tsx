// src/components/ClientBlogsPage.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import BlogCard from "@/components/BlogCard";

// Additional UI components for filters:
import { Checkbox } from "@/components/ui/checkbox";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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
    // Use separate state for pagination when filtering by tag is active.
    const [page, setPage] = useState(currentPage);
    // State for tag filtering.
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    // States for the collapsible (desktop) and sheet (mobile) filter UIs.
    const [isOpen, setIsOpen] = useState(true);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // When search term changes, reset page to 1.
    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    // Debounce the search term.
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Determine whether any filtering is active.
    const isTagFilterActive = selectedTags.length > 0;
    const isFiltering = debouncedSearchTerm || isTagFilterActive;

    // When tag filtering is active, override pagination parameters
    // (for example, to fetch a larger number of posts so that all matching posts are returned)
    const effectivePage = isTagFilterActive ? 1 : page;
    const effectivePerPage = isTagFilterActive ? 100 : 9;

    // Build the search URL if filtering (by text or tags) is active.
    // When not filtering, we fall back on the passed props.
    const searchUrl = isFiltering
        ? `/api/searchPosts?q=${encodeURIComponent(
            debouncedSearchTerm
        )}&tags=${encodeURIComponent(selectedTags.join(","))}&page=${effectivePage}&per_page=${effectivePerPage}`
        : null;

    // Use SWR to fetch search results; use fallbackData if no filtering.
    const { data } = useSWR(searchUrl, fetcher, {
        fallbackData: !searchUrl ? { posts, totalPages } : undefined,
        revalidateOnFocus: false,
    });

    // Use API results when filtering is active; otherwise fallback to passed props.
    const displayedPosts = data?.posts ?? posts;
    const fetchedTotalPages = searchUrl
        ? Number(data?.totalPages) || 0
        : Number(data?.totalPages || totalPages);

    // When filtering by tag is active, we assume the API returns posts already filtered by the given tags.
    const finalFilteredPosts = displayedPosts;

    // Hardcode a custom array of tags.
    const customTags = [
        "Middle Market M&A",
        "About Yong",
        "EXIT Planning",
        "Startup Accelerator and Venture Capital",
        "Real Estate Investment",
        "International Tax",
        "Business and Technology Valuation"
    ];
    // Sort tags alphabetically.
    const allTags = customTags.sort();

    // Handle tag toggle (add or remove a tag)
    const handleTagToggle = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    // Clear all selected tags.
    const clearTags = () => {
        setSelectedTags([]);
    };

    // While filtering is active, show a loading indicator if data hasn't loaded yet.
    if (searchUrl && !data) {
        return (
            <div className="container-custom py-16 text-center">
                <p>Loading search results...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header Section */}
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

            {/* Filter Section */}
            <div className="container-custom py-8">
                {/* Desktop Filter Section */}
                <div className="mb-8 hidden md:block">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Filter by Tags</h3>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        {isOpen ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                                        <span className="sr-only">Toggle filter</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                                    {selectedTags.length > 0 && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={clearTags}
                                            className="mb-3 text-xs h-7 col-span-full"
                                        >
                                            Clear filters
                                        </Button>
                                    )}
                                    {allTags.map((tag) => (
                                        <div key={tag} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`tag-${tag}`}
                                                checked={selectedTags.includes(tag)}
                                                onCheckedChange={() => handleTagToggle(tag)}
                                            />
                                            <label
                                                htmlFor={`tag-${tag}`}
                                                className="text-base font-bold leading-none cursor-pointer"
                                            >
                                                {tag}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>

                {/* Mobile Filter Button */}
                <div className="md:hidden mb-4 flex justify-between items-center">
                    <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Filter
                                {selectedTags.length > 0 && (
                                    <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                    {selectedTags.length}
                  </span>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                            <div className="py-4">
                                <h2 className="text-lg font-semibold mb-4">Filter by Tags</h2>
                                {selectedTags.length > 0 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            clearTags();
                                            setIsMobileFilterOpen(false);
                                        }}
                                        className="mb-4 text-xs"
                                    >
                                        Clear filters
                                    </Button>
                                )}
                                <div className="space-y-4">
                                    {allTags.map((tag) => (
                                        <div key={tag} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`mobile-tag-${tag}`}
                                                checked={selectedTags.includes(tag)}
                                                onCheckedChange={() => handleTagToggle(tag)}
                                            />
                                            <label
                                                htmlFor={`mobile-tag-${tag}`}
                                                className="text-sm font-medium leading-none cursor-pointer"
                                            >
                                                {tag}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {selectedTags.length > 0 && (
                        <div className="flex gap-2 items-center">
                            <span className="text-sm text-gray-500">Active filters:</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearTags}
                                className="h-7 gap-1 text-xs"
                            >
                                Clear <X className="h-3 w-3" />
                            </Button>
                        </div>
                    )}
                </div>

                {/* Active Filters (Desktop only) */}
                {selectedTags.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2 items-center hidden md:flex">
                        <span className="text-sm text-gray-500">Filtering by:</span>
                        {selectedTags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                            >
                {tag}
                                <button
                                    onClick={() => handleTagToggle(tag)}
                                    className="ml-1.5 text-gray-500 hover:text-gray-900"
                                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove filter</span>
                </button>
              </span>
                        ))}
                    </div>
                )}

                {/* Blog Posts */}
                <div>
                    {finalFilteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-bold mb-4">No articles found</h2>
                            <p className="text-gray-600">
                                Try different keywords or filters to browse all articles.
                            </p>
                            {(searchTerm || selectedTags.length > 0) && (
                                <Button
                                    onClick={() => {
                                        setSearchTerm("");
                                        clearTags();
                                    }}
                                    variant="outline"
                                    className="mt-4"
                                >
                                    Clear all filters
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {finalFilteredPosts.map((post: any) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="mt-8">
                    {!isFiltering ? (
                        // When not filtering, use server-based pagination with Next.js Links.
                        <div className="flex justify-center mt-8 space-x-4">
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
                        </div>
                    ) : (
                        // When filtering is active, use local state pagination controls.
                        fetchedTotalPages > 1 && (
                            <div className="flex justify-center mt-8 space-x-4">
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
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
