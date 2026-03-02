export interface ShowcasePost {
    id: number;
    title: {
        rendered: string;
    };
    acf: {
        card_image: string;
        card_category: string;
        card_platform: string;
        card_avatars: string; // Comma-separated URLs for Free ACF support
    };
}

export interface ShowcaseCardData {
    imageSrc: string;
    logoSrc?: string;
    title?: string;
    avatars: string[];
    category: string;
    platform: string;
    link?: string;
}

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

            return {
                imageSrc: post.acf?.card_image || '',
                title: decodedTitle,
                avatars: avatars,
                category: post.acf?.card_category || '',
                platform: post.acf?.card_platform || '',
                link: (post as any).link || '', // The WP REST API returns the post URL in the 'link' property
            };
        });
    } catch (error) {
        console.error('Failed to fetch WordPress posts for Showcase:', error);
        return null; // Let the UI fallback to hardcoded data
    }
}
