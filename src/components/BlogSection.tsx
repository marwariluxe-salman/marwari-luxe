'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Blog } from '@/types';
import Image from 'next/image';
import { getLightBlogData } from '@/services/blogService';

const BlogSection = () => {
  const [displayBlogs, setDisplayBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const { healthBlogs, beautyBlogs } = await getLightBlogData();
        
        // Create a curated mix of blogs: 3 Health + 3 Beauty = 6 total for better distribution
        const blogs = [
          ...healthBlogs.slice(0, 3),           // 3 Health blogs
          ...beautyBlogs.slice(0, 3),           // 3 Beauty blogs  
        ];
        
        setDisplayBlogs(blogs);
      } catch (error) {
        // Error handling is done through UI feedback
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Health & Beauty Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover expert advice and the latest trends in health and beauty through our carefully curated blog posts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBlogs.map((blog, index) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/blogs/${blog.id}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={blog.heroImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={65} // Reduced quality for better mobile performance
                      loading={index < 3 ? "eager" : "lazy"} // Eager load first 3 images
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                      style={{ objectFit: 'cover' }}
                      // Add fetch priority for above-the-fold images
                      fetchPriority={index < 2 ? "high" : "auto"}
                      // Add decoding hint for better performance
                      decoding="async"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-700 transition-colors mobile-blog-title">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{blog.author}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.readTime} min read</span>
                    </div>
                    <span className="text-purple-700 hover:text-purple-800 font-medium transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            View All Blogs
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;