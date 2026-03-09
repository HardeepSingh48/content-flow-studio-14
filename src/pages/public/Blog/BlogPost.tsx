import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PublicNavbar } from '@/components/public-layout/PublicNavbar';
import { PublicFooter } from '@/components/public-layout/PublicFooter';
import { getBlogPostBySlug, BlogPost } from '@/lib/wordpress';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

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

const PostSkeleton = () => (
    <div className="animate-pulse max-w-[760px] mx-auto">
        <div className="h-4 bg-white/10 rounded w-24 mb-8" />
        <div className="h-10 bg-white/10 rounded w-3/4 mb-4" />
        <div className="h-10 bg-white/10 rounded w-1/2 mb-8" />
        <div className="w-full h-[400px] bg-white/10 rounded-2xl mb-10" />
        {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-4 bg-white/10 rounded mb-3" style={{ width: `${70 + Math.random() * 30}%` }} />
        ))}
    </div>
);

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        getBlogPostBySlug(slug).then(data => {
            if (data) {
                setPost(data);
            } else {
                setNotFound(true);
            }
            setLoading(false);
        });
    }, [slug]);

    const featuredImage = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const title = post ? stripHtml(post.title.rendered) : '';
    const readTime = post ? getReadTime(post.content.rendered) : '';

    return (
        <div className="min-h-screen bg-[#0A0E27]">
            <PublicNavbar />
            <main className="pt-32 pb-24">
                <div className="max-w-[800px] mx-auto px-6">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors mb-10"
                    >
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>

                    {loading ? (
                        <PostSkeleton />
                    ) : notFound || !post ? (
                        <div className="text-center py-32">
                            <h2 className="text-white text-2xl font-bold mb-4">Post not found</h2>
                            <p className="text-white/40 mb-8">This post may have been moved or deleted.</p>
                            <Link to="/blog" className="text-[#A78BFA] hover:underline font-semibold">
                                ← Back to Blog
                            </Link>
                        </div>
                    ) : (
                        <article>
                            {/* Meta */}
                            <div className="flex items-center gap-4 text-white/40 text-sm font-medium mb-6">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    {formatDate(post.date)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock size={14} />
                                    {readTime}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-10">
                                {title}
                            </h1>

                            {/* Featured image */}
                            {featuredImage && (
                                <div className="w-full h-[380px] md:h-[460px] rounded-2xl overflow-hidden mb-12 border border-white/10">
                                    <img
                                        src={featuredImage}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Body */}
                            <div
                                className="wp-content prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                            />
                        </article>
                    )}
                </div>
            </main>
            <PublicFooter />

            {/* WordPress content typography styles */}
            <style>{`
                .wp-content {
                    color: rgba(255,255,255,0.75);
                    font-size: 17px;
                    line-height: 1.8;
                }
                .wp-content h1, .wp-content h2, .wp-content h3, .wp-content h4 {
                    color: #fff;
                    font-weight: 700;
                    margin-top: 2.5em;
                    margin-bottom: 0.75em;
                    line-height: 1.3;
                }
                .wp-content h2 { font-size: 1.7rem; }
                .wp-content h3 { font-size: 1.35rem; }
                .wp-content p { margin-bottom: 1.5em; }
                .wp-content a {
                    color: #A78BFA;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                }
                .wp-content a:hover { color: #c4b5fd; }
                .wp-content ul, .wp-content ol {
                    padding-left: 1.5em;
                    margin-bottom: 1.5em;
                }
                .wp-content li { margin-bottom: 0.5em; }
                .wp-content blockquote {
                    border-left: 3px solid #A78BFA;
                    padding-left: 1.25em;
                    margin: 2em 0;
                    color: rgba(255,255,255,0.55);
                    font-style: italic;
                }
                .wp-content img {
                    border-radius: 12px;
                    max-width: 100%;
                    margin: 2em 0;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .wp-content pre, .wp-content code {
                    background: rgba(255,255,255,0.07);
                    border-radius: 6px;
                    font-family: 'Fira Code', monospace;
                    font-size: 0.88em;
                }
                .wp-content pre { padding: 1.25em; overflow-x: auto; margin-bottom: 1.5em; }
                .wp-content code { padding: 0.2em 0.4em; }
                .wp-content hr {
                    border: none;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    margin: 3em 0;
                }
            `}</style>
        </div>
    );
};

export default BlogPostPage;
