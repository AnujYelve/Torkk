"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, User, ArrowLeft, BookOpen, Share2 } from "lucide-react";
import { blogService } from "../../../services/api";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorAlert from "../../../components/ui/ErrorAlert";

export default function SingleBlogPage() {
  const params = useParams();
  const slug = params?.slug;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getBlogBySlug(slug);
      setBlog(data?.blog || data);
    } catch (err) {
      setError(err.message || "Failed to load blog article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#3B36EA] hover:text-[#6E55F2] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        {loading ? (
          <LoadingSpinner text="Loading article..." />
        ) : error ? (
          <ErrorAlert message={error} onRetry={fetchBlog} />
        ) : !blog ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#ECEAF4] p-8">
            <h2 className="text-2xl font-bold text-[#1B1B1F]">Article Not Found</h2>
            <p className="text-sm text-[#66687A] mt-2">The requested blog post could not be found.</p>
            <Link
              href="/blog"
              className="mt-6 inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-[#3B36EA] via-[#6E55F2] to-[#C24D2E] text-white font-bold text-sm"
            >
              Browse All Articles
            </Link>
          </div>
        ) : (
          <article className="bg-white rounded-3xl border border-[#ECEAF4] shadow-[0_10px_30px_rgba(110,85,242,0.04)] overflow-hidden">
            {blog.coverImageUrl && (
              <div className="h-64 sm:h-96 w-full overflow-hidden bg-[#F8F6FB]">
                <img
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8 sm:p-12 space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#66687A]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-[#6E55F2]" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                {blog.authorName && (
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-4 h-4 text-[#6E55F2]" />
                    {blog.authorName}
                  </span>
                )}
                {blog.category && (
                  <span className="px-3 py-1 rounded-full bg-[#F8F6FB] border border-[#ECEAF4] text-[#3B36EA] font-bold text-[10px] uppercase">
                    {blog.category}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1B1B1F] tracking-tight leading-tight">
                {blog.title}
              </h1>

              {blog.excerpt && (
                <p className="text-lg text-[#66687A] font-medium leading-relaxed border-l-4 border-[#3B36EA] pl-4 italic">
                  {blog.excerpt}
                </p>
              )}

              <div className="prose prose-slate max-w-none text-[#1B1B1F] leading-relaxed pt-4 space-y-4 text-base whitespace-pre-line">
                {blog.content}
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
