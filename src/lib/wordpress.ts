export interface ShowcasePost {
    id: number;
    slug: string;
    link: string;
    title: {
        rendered: string;
    };
    acf: {
        card_image: string;
        card_category: string;
        card_platform: string;
        card_avatars: string;
    };
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string }>;
    };
}

export interface ShowcaseCardData {
    imageSrc: string;
    logoSrc?: string;
    title?: string;
    avatars: string[];
    category: string;
    platform: string;
    slug?: string;
    link?: string;
}

export interface BlogPost {
    id: number;
    slug: string;
    date: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    };
}

const FALLBACK_SHOWCASE_CARDS: ShowcaseCardData[] = [];

export async function getShowcasePosts(): Promise<ShowcaseCardData[] | null> {
    const apiUrl = import.meta.env.VITE_WP_API_URL;

    if (!apiUrl) {
        console.warn('VITE_WP_API_URL is not defined in environment variables.');
        return null;
    }

    try {
        const response = await fetch(`${apiUrl}/posts?per_page=100&_embed`);
        if (!response.ok) {
            throw new Error(`WordPress API returned status ${response.status}`);
        }

        const posts: ShowcasePost[] = await response.json();

        return posts.map(post => {
            // Strip HTML entities from title
            const parser = new DOMParser();
            const decodedTitle = parser.parseFromString(post.title.rendered, 'text/html').documentElement.textContent || post.title.rendered;

            // Handle comma-separated string for Free ACF support
            const avatarsRaw = post.acf?.card_avatars || '';
            const avatars = typeof avatarsRaw === 'string'
                ? avatarsRaw.split(',').map(url => url.trim()).filter(Boolean)
                : [];

            // Use ACF card_image first; fall back to WP featured image if unset
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
            const imageSrc = post.acf?.card_image || featuredImage;

            return {
                imageSrc,
                title: decodedTitle,
                avatars: avatars,
                category: post.acf?.card_category || '',
                platform: post.acf?.card_platform || '',
                slug: post.slug || '',
                link: post.link || '',
            };
        });
    } catch (error) {
        console.error('Failed to fetch WordPress posts for Showcase:', error);
        return null;
    }
}

export async function getBlogPosts(): Promise<BlogPost[] | null> {
    const apiUrl = import.meta.env.VITE_WP_API_URL;
    if (!apiUrl) return null;
    try {
        const response = await fetch(`${apiUrl}/posts?per_page=100&_embed`);
        if (!response.ok) throw new Error(`WordPress API returned status ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        return null;
    }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const apiUrl = import.meta.env.VITE_WP_API_URL;
    if (!apiUrl) return null;
    try {
        const response = await fetch(`${apiUrl}/posts?slug=${encodeURIComponent(slug)}&_embed`);
        if (!response.ok) throw new Error(`WordPress API returned status ${response.status}`);
        const posts: BlogPost[] = await response.json();
        return posts[0] ?? null;
    } catch (error) {
        console.error('Failed to fetch blog post by slug:', error);
        return null;
    }
}
