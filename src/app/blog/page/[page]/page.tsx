// src/app/blog/page/[page]/page.tsx

import ClientBlogsPage from "../../ClientBlogsPage";
import { getPostsByPage, getTotalPages, WPPost } from "@/lib/wordpress";

interface PageProps {
    params: Promise<{
        page: string;
    }>;
    searchParams: Promise<{ q?: string }>;
}

export async function generateStaticParams() {
    const perPage = 9;
    const totalPages = await getTotalPages(perPage);
    // Generate page numbers as strings.
    return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }));
}

export default async function BlogPage({ params, searchParams }: PageProps) {
    // Await the params and searchParams before using them.
    const { page } = await params;
    const currentPage = parseInt(page, 10);
    const { q: searchQuery = "" } = await searchParams;
    const perPage = 9;
    let posts: WPPost[];
    let totalPages: number;

    // If there is a search query, leave posts empty so that the client component fetches them.
    if (searchQuery) {
        posts = [];
        totalPages = 1;
    } else {
        posts = await getPostsByPage(currentPage, perPage);
        totalPages = await getTotalPages(perPage);
    }

    return (
        <div>
            <ClientBlogsPage posts={posts} currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
}
