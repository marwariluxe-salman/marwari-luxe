'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { blogs } from '@/data/blogs';
import { Blog } from '@/types';
import AdUnit from '@/components/AdUnit';

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

const BlogPost = () => {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      console.log('Looking for blog with ID:', params.id);
      const foundBlog = blogs.find(b => b.id === params.id);
      console.log('Found blog:', foundBlog ? foundBlog.title : 'Not found');
      setBlog(foundBlog || null);
      
      if (foundBlog) {
        // Get related blogs from the same category
        const related = blogs
          .filter(b => b.category === foundBlog.category && b.id !== foundBlog.id)
          .slice(0, 3);
        setRelatedBlogs(related);
      }
      setIsLoading(false);
    }
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
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full relative"
        >
          <Image
            src={blog.heroImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
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
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {blog.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center space-x-6 text-lg"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="prose prose-lg max-w-none"
        >
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
            
            {/* Additional Content Sections
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Understanding the fundamentals is crucial for long-term success</li>
                  <li>Consistency and patience are key to seeing results</li>
                  <li>Always consult with professionals for personalized advice</li>
                  <li>Quality products and ingredients make a significant difference</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Expert Recommendations</h2>
                <p className="text-gray-700">
                  Based on extensive research and clinical studies, we recommend following a 
                  structured approach that combines traditional wisdom with modern scientific 
                  understanding. This holistic method ensures optimal results while maintaining 
                  safety and sustainability.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
                <p className="text-gray-700">
                  The journey to optimal health and beauty is personal and unique to each individual. 
                  By understanding the principles outlined in this article and applying them 
                  consistently, you can achieve your wellness goals while maintaining a balanced 
                  and sustainable lifestyle.
                </p>
              </div>
            </div> */}
          </div>
        </motion.div>

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 bg-gray-50 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">About the Author</h3>
          <p className="text-gray-700">
            <strong>{blog.author}</strong> is a certified health and wellness expert with over 10 years 
            of experience in the industry. They specialize in evidence-based approaches to health 
            and beauty, combining traditional wisdom with modern scientific research.
          </p>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
          <div className="flex justify-center space-x-4 mt-6">
            <button 
              onClick={() => {
                const url = window.location.href;
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
            >
              <FacebookIcon className="mr-2" />
              Facebook
            </button>
            <button 
              onClick={() => {
                const url = window.location.href;
                const text = `Check out this article: ${blog.title}`;
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors flex items-center"
            >
              <TwitterIcon className="mr-2" />
              Twitter
            </button>
            <button 
              onClick={() => {
                const url = window.location.href;
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
              }}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors flex items-center"
            >
              <LinkedInIcon className="mr-2" />
              LinkedIn
            </button>
            <button 
              onClick={() => {
                const url = window.location.href;
                const text = `Check out this article: ${blog.title} - ${url}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center"
            >
              <WhatsAppIcon className="mr-2" />
              WhatsApp
            </button>
          </div>
        </motion.div>

        {/* Related Products */}
        {blog.products && blog.products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Recommended Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blog.products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h4>
                    <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                      <Link
                        href={`/products/${product.id}`}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Articles</h2>
              <p className="text-lg text-gray-600">
                Continue your journey with these related {blog.category.toLowerCase()} articles
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog, index) => (
                <motion.article
                  key={relatedBlog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedBlog.heroImage}
                      alt={relatedBlog.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                    <Link
                      href={`/blogs/${relatedBlog.id}`}
                      className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blogs */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blogs"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Blogs
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;

// SVG Icons for social media sharing
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className || ''}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className || ''}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className || ''}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className || ''}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" clipRule="evenodd" />
  </svg>
);