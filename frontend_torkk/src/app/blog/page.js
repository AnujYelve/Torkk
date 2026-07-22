"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import { blogService } from "../../services/api";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorAlert from "../../components/ui/ErrorAlert";
import EmptyState from "../../components/ui/EmptyState";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getPublicBlogs();
      setBlogs(Array.isArray(data) ? data : data?.blogs || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6E55F2]/10 border border-[#6E55F2]/20 text-[#3B36EA] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#6E55F2]" />
            <span>Torkk Newsroom & Blog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1B1B1F] tracking-tight leading-tight">
            Latest News & Product Updates
          </h1>
          <p className="text-lg text-[#66687A] leading-8">
            Insights on fair mobility, driver empowerment, safety, and community trust.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorAlert message={error} onRetry={fetchBlogs} />
        ) : blogs.length === 0 ? (
          <EmptyState
            title="No Blog Posts Yet"
            description="We haven't published any articles yet. Check back soon!"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-3xl border border-[#ECEAF4] shadow-[0_10px_30px_rgba(110,85,242,0.04)] hover:shadow-xl hover:shadow-[#3B36EA]/10 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {blog.coverImageUrl && (
                  <div className="h-48 overflow-hidden bg-[#F8F6FB]">
                    <img
                      src={blog.coverImageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="flex items-center gap-4 text-xs text-[#66687A]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#6E55F2]" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    {blog.authorName && (
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#6E55F2]" />
                        {blog.authorName}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-[#1B1B1F] group-hover:text-[#3B36EA] transition-colors line-clamp-2 leading-tight">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-[#66687A] line-clamp-3 flex-grow leading-8">
                    {blog.excerpt || blog.content?.substring(0, 120)}...
                  </p>
                  <Link
                    href={`/blog/${blog.slug || blog.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#3B36EA] hover:text-[#6E55F2] pt-2 transition-colors"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
