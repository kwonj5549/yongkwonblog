// src/lib/wordpress.ts

export interface WPPost {
    id: number;
    date: string;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    jetpack_featured_media_url?: string; // For featured image
    _embedded?: {
        "wp:term"?: Array<
            Array<{
                id: number;
                name: string;
                taxonomy: string;
            }>
        >;
    };
}

export async function getPostsByPage(page: number, perPage: number): Promise<WPPost[]> {
    const apiUrl = process.env.WORDPRESS_API_URL;
    const res = await fetch(`${apiUrl}/posts?_embed&per_page=${perPage}&page=${page}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch posts for page ${page}`);
    }
    return res.json();
}

export async function getTotalPages(perPage: number): Promise<number> {
    const apiUrl = process.env.WORDPRESS_API_URL;
    const res = await fetch(`${apiUrl}/posts?_embed&per_page=${perPage}&page=1`, {
        next: { revalidate: 60 },
    });
    // WordPress returns the total number of pages in the X-WP-TotalPages header.
    const totalPagesHeader = res.headers.get("X-WP-TotalPages");
    return totalPagesHeader ? parseInt(totalPagesHeader, 10) : 1;
}
//test
export async function getAllPosts(): Promise<WPPost[]> {
    const apiUrl = process.env.WORDPRESS_API_URL;
    let page = 1;
    const perPage = 100; // Maximum allowed per request by WordPress
    let allPosts: WPPost[] = [];
    let fetchedPosts: WPPost[] = [];

    do {
        const res = await fetch(
            `${apiUrl}/posts?_embed&per_page=${perPage}&page=${page}`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) {
            throw new Error("Failed to fetch posts");
        }
        fetchedPosts = await res.json();
        allPosts = allPosts.concat(fetchedPosts);
        page++;
    } while (fetchedPosts.length === perPage); // Continue if the current page is full

    return allPosts;
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
    const apiUrl = process.env.WORDPRESS_API_URL;
    const res = await fetch(`${apiUrl}/posts?slug=${slug}&_embed`, { next: { revalidate: 60 } });
    const posts: WPPost[] = await res.json();
    if (!posts || posts.length === 0) {
        return null;
    }
    return posts[0];
}
