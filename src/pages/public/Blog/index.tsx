import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '@/components/public-layout/PublicNavbar';
import { PublicFooter } from '@/components/public-layout/PublicFooter';
import { getBlogPosts, BlogPost } from '@/lib/wordpress';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

function getReadTime(html: string): string {
    const text = html.replace(/<[^>]+>/g, '');
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
}

function stripHtml(html: string): string {
    const parser = new DOMParser();
    return parser.parseFromString(html, 'text/html').documentElement.textContent || '';
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const BlogCard = ({ post }: { post: BlogPost }) => {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const excerpt = stripHtml(post.excerpt.rendered).replace(/\[&hellip;\]|\[…\]/g, '…');
    const readTime = getReadTime(post.content.rendered);
    const title = stripHtml(post.title.rendered);

    return (
        <Link
            to={`/blog/${post.slug}`}
            className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:bg-white/8 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
            <div className="w-full h-[220px] overflow-hidden bg-neutral-900 flex-shrink-0">
                {featuredImage ? (
                    <img
                        src={featuredImage}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1E2548] to-[#2D1B69] flex items-center justify-center">
                        <span className="text-white/20 text-5xl font-bold">{title.charAt(0)}</span>
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-white/40 text-xs font-medium mb-3">
                    <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {readTime}
                    </span>
                </div>
                <h2 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-[#A78BFA] transition-colors line-clamp-2">
                    {title}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed line-clamp-3 flex-1">
                    {excerpt}
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-[#A78BFA] text-sm font-semibold">
                    Read more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
};

const BlogCardSkeleton = () => (
    <div className="flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
        <div className="w-full h-[220px] bg-white/10" />
        <div className="p-6 space-y-3">
            <div className="h-3 bg-white/10 rounded w-1/3" />
            <div className="h-5 bg-white/10 rounded w-full" />
            <div className="h-5 bg-white/10 rounded w-3/4" />
            <div className="h-3 bg-white/10 rounded w-full mt-2" />
            <div className="h-3 bg-white/10 rounded w-2/3" />
        </div>
    </div>
);

const BlogPage = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        getBlogPosts().then(data => {
            if (data && data.length > 0) {
                setPosts(data);
            } else {
                setNoData(true);
            }
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#0A0E27]">
            <PublicNavbar />
            <main className="pt-32 pb-24">
                <div className="max-w-[1200px] mx-auto px-6">
                    {/* Header */}
                    <div className="mb-16">
                        <p className="text-[#A78BFA] text-xs font-bold uppercase tracking-widest mb-4">From the Blog</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                            Insights & Strategies
                        </h1>
                        <p className="text-white/50 text-lg max-w-xl">
                            Actionable content strategy articles, case studies, and platform deep-dives for serious teams.
                        </p>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map(i => <BlogCardSkeleton key={i} />)}
                        </div>
                    ) : noData ? (
                        <div className="text-center py-32">
                            <p className="text-white/30 text-lg">No blog posts found. Connect your WordPress site to get started.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map(post => <BlogCard key={post.id} post={post} />)}
                        </div>
                    )}
                </div>
            </main>
            <PublicFooter />
        </div>
    );
};

export default BlogPage;
