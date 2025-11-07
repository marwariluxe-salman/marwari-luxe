import { Blog } from '@/types';

// Instead of importing the full blog data directly, we'll use a more efficient approach
// Create a lightweight index of blogs for initial loads
const blogIndex: Blog[] = [
  // Health Blogs
  {
    id: 'health-blog-001',
    title: 'Fibremaxxingggg Diet: Why Fiber is the Hottest Health Trend in 2025',
    excerpt: 'Discover why the Fibremaxxing Diet is trending in 2025. Learn how adding more fiber boosts gut health, weight loss, and energy naturally.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761864930/Marwari-luxe_dnwxfa.jpg',
    images: [],
    category: 'Health',
    author: 'Dr. Sarah Johnson',
    publishedAt: '2025-01-15',
    readTime: 8
  },
  {
    id: 'health-blog-002',
    title: 'The Science Behind Anti-Aging Skincare in 2025',
    excerpt: 'Explore the latest breakthroughs in anti-aging skincare and what ingredients really work to turn back the clock.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761864926/marwari1_azrf1z.jpg',
    images: [],
    category: 'Health',
    author: 'Dr. Michael Chen',
    publishedAt: '2025-01-10',
    readTime: 6
  },
  // Beauty Blogs
  {
    id: 'beauty-blog-001',
    title: 'Natural Beauty: The Rise of Clean Cosmetics',
    excerpt: 'Discover why clean cosmetics are taking over the beauty industry and how to choose the right products for your skin.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761864928/marwari2_hs4y31.jpg',
    images: [],
    category: 'Beauty',
    author: 'Emma Rodriguez',
    publishedAt: '2025-01-12',
    readTime: 7
  },
  // Evergreen Health Blogs
  {
    id: 'evergreen-health-001',
    title: '10 Essential Vitamins Your Body Needs',
    excerpt: 'Learn about the essential vitamins your body needs for optimal health and where to find them in your diet.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863544/800400_ljnnqg.png',
    images: [],
    category: 'Health',
    author: 'Dr. James Wilson',
    publishedAt: '2024-12-01',
    readTime: 5
  },
  // Evergreen Beauty Blogs
  {
    id: 'evergreen-beauty-001',
    title: 'The Ultimate Guide to Skincare Routines',
    excerpt: 'Master the art of skincare with this comprehensive guide to building the perfect routine for your skin type.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863553/200300_n50ysr.png',
    images: [],
    category: 'Beauty',
    author: 'Sophia Martinez',
    publishedAt: '2024-11-15',
    readTime: 9
  }
];

// Use the lightweight blog data for initial loads
export const getLightBlogData = async (): Promise<{
  healthBlogs: Blog[];
  beautyBlogs: Blog[];
  evergreenHealthBlogs: Blog[];
  evergreenBeautyBlogs: Blog[];
}> => {
  // For now, we'll use the simple blog data
  const { healthBlogs, beautyBlogs, evergreenHealthBlogs, evergreenBeautyBlogs } = await import('@/data/blogs-simple');
  return { healthBlogs, beautyBlogs, evergreenHealthBlogs, evergreenBeautyBlogs };
};

// Get a specific blog by ID - only load full data when needed
export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  try {
    // First check if it's in our lightweight index
    const blogFromIndex = blogIndex.find(blog => blog.id === id);
    if (blogFromIndex) {
      // If found in index, load the full blog data
      const { blogs } = await import('@/data/blogs');
      return blogs.find(blog => blog.id === id);
    }
    return undefined;
  } catch (error) {
    console.error('Error loading blog data:', error);
    return undefined;
  }
};

// Get related blogs by category - only load when needed
export const getRelatedBlogs = async (categoryId: string, excludeId: string, limit: number = 3): Promise<Blog[]> => {
  try {
    // First check if we have blogs in our index for this category
    const categoryBlogs = blogIndex.filter(blog => 
      blog.category === categoryId && blog.id !== excludeId
    );
    
    if (categoryBlogs.length >= limit) {
      // If we have enough in index, return those
      return categoryBlogs.slice(0, limit);
    }
    
    // Otherwise, load full data
    const { blogs } = await import('@/data/blogs');
    return blogs
      .filter(blog => blog.category === categoryId && blog.id !== excludeId)
      .slice(0, limit);
  } catch (error) {
    console.error('Error loading related blogs:', error);
    return [];
  }
};

// For the blogs page, we'll implement pagination
export const getBlogPage = async (page: number = 1, pageSize: number = 12): Promise<{ blogs: Blog[], totalPages: number }> => {
  try {
    // Load full blog data
    const { blogs } = await import('@/data/blogs');
    
    // Calculate pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedBlogs = blogs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(blogs.length / pageSize);
    
    return { blogs: paginatedBlogs, totalPages };
  } catch (error) {
    console.error('Error loading blog page:', error);
    return { blogs: [], totalPages: 0 };
  }
};

// Search blogs by term
export const searchBlogs = async (term: string): Promise<Blog[]> => {
  try {
    // First try to search in our lightweight index
    const termLower = term.toLowerCase();
    const indexMatches = blogIndex.filter(blog => 
      blog.title.toLowerCase().includes(termLower) || 
      blog.excerpt.toLowerCase().includes(termLower)
    );
    
    if (indexMatches.length > 0) {
      return indexMatches;
    }
    
    // If no matches in index, load full data
    const { blogs } = await import('@/data/blogs');
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(termLower) || 
      blog.excerpt.toLowerCase().includes(termLower) ||
      blog.content.toLowerCase().includes(termLower)
    );
  } catch (error) {
    console.error('Error searching blogs:', error);
    return [];
  }
};