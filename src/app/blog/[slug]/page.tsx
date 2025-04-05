import { notFound } from "next/navigation";
import {
    getPostBySlug,
    getAllPosts,
    getTranslatedPostBySlug,
    getAllTranslatedPosts,
    WPPost,
} from "@/lib/wordpress";
import BlogContent from "@/components/BlogContent";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    // For static paths, we use posts from WordPress (assumed to be in English)
    const posts = await getAllPosts();
    return posts.map((post: WPPost) => ({ slug: post.slug }));
}

export default async function BlogPage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const englishPost = await getPostBySlug(slug);
    const koreanPost = await getTranslatedPostBySlug(slug);

    if (!englishPost && !koreanPost) {
        notFound();
    }

    const englishAllPosts = await getAllPosts();
    const koreanAllPosts = await getAllTranslatedPosts();

    // Convert data to plain objects to avoid serialization issues.
    const englishPostPlain = englishPost ? JSON.parse(JSON.stringify(englishPost)) : null;
    const koreanPostPlain = koreanPost ? JSON.parse(JSON.stringify(koreanPost)) : null;
    const englishAllPostsPlain = JSON.parse(JSON.stringify(englishAllPosts));
    const koreanAllPostsPlain = JSON.parse(JSON.stringify(koreanAllPosts));

    return (
        <BlogContent
            englishPost={englishPostPlain}
            koreanPost={koreanPostPlain}
            englishAllPosts={englishAllPostsPlain}
            koreanAllPosts={koreanAllPostsPlain}
        />
    );
}
