import { getBlogById, getRelatedBlogs } from '@/services/blogService';
import BlogPostClient from '@/components/BlogPostClient';

// Function to generate dynamic metadata for blog posts
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const blog = await getBlogById(params.id);
    
    if (!blog) {
      return {
        title: 'Blog Post Not Found - Marwari Luxe',
        description: 'The blog post you are looking for could not be found.',
      };
    }
    
    const baseUrl = 'https://marwariluxe.com';
    const blogUrl = `${baseUrl}/blogs/${blog.id}`;
    
    return {
      title: `${blog.title} - Marwari Luxe Health & Beauty Blog`,
      description: blog.excerpt,
      alternates: {
        canonical: blogUrl
      },
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        url: blogUrl,
        type: 'article',
        images: [
          {
            url: blog.heroImage,
            width: 1200,
            height: 630,
            alt: blog.title
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.excerpt,
        images: [blog.heroImage]
      }
    };
  } catch {
    return {
      title: 'Blog Post - Marwari Luxe',
      description: 'Read our latest health and beauty blog posts.',
    };
  }
}

const BlogPost = async ({ params }: { params: { id: string } }) => {
  try {
    const blog = await getBlogById(params.id);
    
    if (!blog) {
      // Return the client component with null blog
      return <BlogPostClient blog={null} relatedBlogs={[]} />;
    }
    
    // Get related blogs from the same category
    const relatedBlogs = await getRelatedBlogs(blog.category, blog.id, 3);
    
    return <BlogPostClient blog={blog} relatedBlogs={relatedBlogs} />;
  } catch (error) {
    console.error('Error loading blog post:', error);
    // Return the client component with error state
    return <BlogPostClient blog={null} relatedBlogs={[]} />;
  }
};

export default BlogPost;