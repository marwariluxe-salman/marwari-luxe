'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/types';



// Component to render images with Next.js Image component
const BlogImage = ({ src, alt }: { src: string; alt: string }) => {
  // Decode the URL and alt text
  const decodedSrc = decodeURIComponent(src);
  const decodedAlt = decodeURIComponent(alt);
  
  return (
    <div className="relative w-full h-auto my-4 rounded-lg shadow-md">
      <Image
        src={decodedSrc}
        alt={decodedAlt}
        width={800}
        height={600}
        className="rounded-lg w-full h-auto"
        quality={75}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
        style={{ objectFit: 'cover' }}
        decoding="async"
      />
    </div>
  );
};

// Component to render content with proper image handling
const BlogContent = ({ content }: { content: string }) => {
  // Split content by double newlines to handle paragraphs
  const paragraphs = content.split('\n\n');
  
  return (
    <div className="space-y-6">
      {paragraphs.map((paragraph, index) => {
        // Check if paragraph contains HTML tags, markdown images, or headings
        if (paragraph.includes('<br>') || paragraph.includes('<h1') || paragraph.includes('![')) {
          // Process the paragraph to extract images
          const parts: React.ReactNode[] = [];
          let lastIndex = 0;
          
          // First, handle markdown images: ![alt](src)
          const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
          let match;
          let tempParagraph = paragraph;
          
          // Find all markdown images and replace them with placeholders
          while ((match = markdownImageRegex.exec(paragraph)) !== null) {
            const fullMatch = match[0];
            const alt = match[1];
            const src = match[2];
            
            // Replace with our custom placeholder
            tempParagraph = tempParagraph.replace(
              fullMatch,
              `<div class="nextjs-image-placeholder" data-src="${src}" data-alt="${alt}"></div>`
            );
          }
          
          // Now process with the existing logic for our custom placeholders
          const imageRegex = /<div class="nextjs-image-placeholder" data-src="([^"]*)" data-alt="([^"]*)"><\/div>/g;
          let imageMatch;
          lastIndex = 0;
          
          // Find all image placeholders
          while ((imageMatch = imageRegex.exec(tempParagraph)) !== null) {
            // Add text before the image
            if (imageMatch.index > lastIndex) {
              const text = tempParagraph.substring(lastIndex, imageMatch.index);
              parts.push(
                <div 
                  key={`${index}-${lastIndex}`} 
                  dangerouslySetInnerHTML={{ __html: text.replace(/<br\s*\/?>/g, '<br />') }} 
                  className="text-gray-800 leading-relaxed"
                />
              );
            }
            
            // Add the image component
            const src = imageMatch[1];
            const alt = imageMatch[2];
            parts.push(<BlogImage key={`${index}-${imageMatch.index}`} src={src} alt={alt} />);
            
            lastIndex = imageMatch.index + imageMatch[0].length;
          }
          
          // Add remaining text after the last image
          if (lastIndex < tempParagraph.length) {
            const text = tempParagraph.substring(lastIndex);
            parts.push(
              <div 
                key={`${index}-${lastIndex}`} 
                dangerouslySetInnerHTML={{ __html: text.replace(/<br\s*\/?>/g, '<br />') }} 
                className="text-gray-800 leading-relaxed"
              />
            );
          }
          
          return <div key={index}>{parts}</div>;
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
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading for client-side effects
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
            style={{ objectFit: 'cover' }}
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 mobile-blog-title">
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
              <BlogContent content={blog.content} />
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
                          style={{ objectFit: 'cover' }}
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
                      style={{ objectFit: 'cover' }}
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