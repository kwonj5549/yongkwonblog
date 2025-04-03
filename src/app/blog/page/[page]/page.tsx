// src/app/blog/page/[page]/page.tsx

import ClientBlogsPage from "../../ClientBlogsPage"; // We'll update this component next
import { getPostsByPage, getTotalPages, WPPost } from "@/lib/wordpress";

interface PageProps {
    params: {
        page: string;
    };
}

export async function generateStaticParams() {
    const perPage = 9;
    const totalPages = await getTotalPages(perPage);
    // Generate an array of page numbers as strings.
    const pages = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }));
    return pages;
}

export default async function BlogPage({ params }: PageProps) {
    const currentPage = parseInt(params.page, 10);
    const perPage = 9;
    const posts: WPPost[] = await getPostsByPage(currentPage, perPage);
    const totalPages = await getTotalPages(perPage);

    return (
        <div>
            <ClientBlogsPage posts={posts} currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
}
