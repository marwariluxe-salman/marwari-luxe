'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/types';
import { getBlogById, getRelatedBlogs } from '@/services/blogService';

// Function to render HTML content safely
const renderHTMLContent = (content: string) => {
  // Split content by double newlines to handle paragraphs
  const paragraphs = content.split('\n\n');
  
  return (
    <div className="space-y-6">
      {paragraphs.map((paragraph, index) => {
        // Check if paragraph contains HTML tags or markdown images
        if (paragraph.includes('<br>') || paragraph.includes('<h1') || paragraph.includes('<img') || paragraph.includes('![')) {
          // Replace <br> tags with actual line breaks
          let processedContent = paragraph.replace(/<br\s*\/?>/g, '<br />');
          
          // Convert markdown image syntax ![alt](src) to HTML img tags
          processedContent = processedContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg shadow-md my-4" style="max-width: 100%; height: auto;" />');
          
          // Create a unique key for dangerouslySetInnerHTML
          return (
            <div 
              key={index} 
              dangerouslySetInnerHTML={{ __html: processedContent }} 
              className="text-gray-800 leading-relaxed"
            />
          );
        } else {
          // Regular paragraph without HTML
          return (
            <p key={index} className="text-gray-800 leading-relaxed">
              {paragraph}
            </p>
          );
        }
      })}
    </div>
  );
};

const BlogPostClient = ({ blog, relatedBlogs }: { blog: Blog | null; relatedBlogs: Blog[] }) => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading for client-side effects
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Error Loading Blog</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/blogs"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/blogs"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="w-full h-full relative">
          <Image
            src={blog.heroImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <div className="mb-4">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                blog.category === 'Health' 
                  ? 'bg-green-500'
                  : blog.category === 'Beauty'
                  ? 'bg-pink-500'
                  : blog.category === 'Evergreen Health'
                  ? 'bg-emerald-500'
                  : 'bg-rose-500'
              }`}>
                {blog.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 mobile-blog-title">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-lg">
              <span>{blog.author}</span>
              <span>•</span>
              <span>{blog.readTime} min read</span>
              <span>•</span>
              <span>
                {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Excerpt */}
          <div className="text-xl text-gray-600 font-medium mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-purple-500">
            {blog.excerpt}
          </div>

          {/* Main Content */}
          <div className="text-gray-800 leading-relaxed space-y-6">
            {/* Render content with proper formatting */}
            <div className="prose prose-lg max-w-none">
              {renderHTMLContent(blog.content)}
            </div>
            
            {/* Products Section */}
            {blog.products && blog.products.length > 0 && (
              <section className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blog.products.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className="relative h-48 w-full">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-purple-600">${product.price}</span>
                          <Link 
                            href={`/products/${product.id}`}
                            className="text-sm bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                          >
                            View Product
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Additional Content Sections */}
            <div className="space-y-8 mt-12">
              {/* Ad Space - Placeholder for Google AdSense */}
              <div className="h-48 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-gray-500 text-center">
                  <div>Advertisement</div>
                  <div className="text-sm">Google AdSense will place ads here</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link 
                  key={relatedBlog.id} 
                  href={`/blogs/${relatedBlog.id}`}
                  className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-40">
                    <Image
                      src={relatedBlog.heroImage}
                      alt={relatedBlog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mobile-blog-title">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {relatedBlog.readTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blogs */}
        <div className="mt-12 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Blogs
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPostClient;