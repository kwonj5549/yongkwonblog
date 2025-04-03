// src/app/blog/page/[page]/page.tsx

import ClientBlogsPage from "../../ClientBlogsPage";
import { getPostsByPage, getTotalPages, WPPost } from "@/lib/wordpress";

interface PageProps {
    params: Promise<{ page: string }>;
    searchParams: Promise<{ q?: string }>;
}

export async function generateStaticParams() {
    const perPage = 9;
    const totalPages = await getTotalPages(perPage);
    // Generate page numbers as strings.
    return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }));
}

export default async function BlogPage({ params, searchParams }: PageProps) {
    // Await params and searchParams before destructuring
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const currentPage = parseInt(resolvedParams.page, 10);
    const perPage = 9;
    const searchQuery = resolvedSearchParams.q ?? "";
    let posts: WPPost[];
    let totalPages: number;

    // When there's no search query, fetch server-side paginated posts.
    // If there is a search query, leave posts empty – the client component will fetch them.
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
