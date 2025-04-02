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

export async function getAllPosts(): Promise<WPPost[]> {
    const apiUrl = process.env.WORDPRESS_API_URL;
    const res = await fetch(`${apiUrl}/posts?_embed`, { next: { revalidate: 60 } });
    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }
    return res.json();
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
    const apiUrl = process.env.WORDPRESS_API_URL;
    const res = await fetch(`${apiUrl}/posts?slug=${slug}&_embed`, { next: { revalidate: 60 } });
    const posts: WPPost[] = await res.json();
    console.log(posts);
    if (!posts || posts.length === 0) {
        return null;
    }
    return posts[0];
}
