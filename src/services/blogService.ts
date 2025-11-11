import { Blog } from '@/types';

// Instead of importing the full blog data directly, we'll use a more efficient approach
// Create a lightweight index of blogs for initial loads
export const blogIndex: Blog[] = [
  // Health Blogs
  {
    id: 'health-blog-001',
    title: 'Fibremaxxing Diet: Why Fiber is the Hottest Health Trend in 2025',
    excerpt: 'Discover why the Fibremaxxing Diet is trending in 2025. Learn how adding more fiber boosts gut health, weight loss, and energy naturally.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761864930/Marwari-luxe_dnwxfa.jpg',
    images: [],
    category: 'Health',
    author: 'Dr. Sarah Johnson',
    publishedAt: '2025-01-15',
    readTime: 15
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
    readTime: 12
  },
  {
    id: 'health-blog-003',
    title: 'Sleep Therapy 2025: How Bed-Rotting Became the New Self-Care.',
    excerpt: 'In 2025, Sleep Therapy has evolved from a wellness trend into a lifestyle movement. The "bed-rotting" era proves that rest, recovery, and mental reset aren\'t laziness — they\'re essential parts of self-care. Learn how mindful rest can heal your body, restore focus, and redefine productivity in a world that never stops.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863570/blog3-2_pabxj0.png',
    images: [],
    category: 'Health',
    author: 'Dr. Amanda Roberts',
    publishedAt: '2025-01-05',
    readTime: 15
  },
  {
    id: 'health-blog-004',
    title: 'Plant-Based Protein: Best Alternatives to Meat in Modern Diets.',
    excerpt: 'Discover the best plant-based protein sources to replace meat in your diet. Learn how to build muscle, stay healthy, and enjoy flavorful meals without animal products.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863656/blog4-2_af3nqp.png',
    images: [],
    category: 'Health',
    author: 'Dr. James Wilson',
    publishedAt: '2025-01-08',
    readTime: 14
  },
  {
    id: 'health-blog-005',
    title: 'Probiotics and Gut Health: The Foundation of Wellness in 2025.',
    excerpt: 'Explore how probiotics and gut health are revolutionizing modern wellness. Learn about the gut-brain connection, fermented foods, and how to improve your digestive system naturally.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863547/blog2-1_jakq66.png',
    images: [],
    category: 'Health',
    author: 'Dr. Sarah Johnson',
    publishedAt: '2025-01-12',
    readTime: 15
  },
  {
    id: 'health-blog-006',
    title: 'Fermented Foods: The Ancient Superfoods Taking Over Modern Kitchens.',
    excerpt: 'Discover the power of fermented foods and how they can transform your gut health, boost immunity, and improve digestion. Learn about kefir, kimchi, sauerkraut, and more.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863544/800400_ljnnqg.png',
    images: [],
    category: 'Health',
    author: 'Dr. Michael Chen',
    publishedAt: '2025-01-14',
    readTime: 15
  },
  {
    id: 'health-blog-007',
    title: 'The Complete Guide to Adaptogens: Natural Stress Relief in 2025.',
    excerpt: 'Learn how adaptogens like ashwagandha, rhodiola, and reishi mushrooms can help your body adapt to stress, boost energy, and improve mental clarity naturally.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863553/200300_n50ysr.png',
    images: [],
    category: 'Health',
    author: 'Dr. Amanda Roberts',
    publishedAt: '2025-01-16',
    readTime: 12
  },
  {
    id: 'health-blog-008',
    title: 'Mindful Movement: The Rise of Gentle Fitness in 2025.',
    excerpt: 'Explore how mindful movement practices like yoga, tai chi, and walking meditation are becoming the preferred fitness methods for stress relief and holistic wellness.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761864930/Marwari-luxe_dnwxfa.jpg',
    images: [],
    category: 'Health',
    author: 'Dr. James Wilson',
    publishedAt: '2025-01-18',
    readTime: 15
  },
  {
    id: 'health-blog-009',
    title: 'Blue Light Blocking: Protecting Your Eyes and Sleep in the Digital Age.',
    excerpt: 'Discover how blue light from screens affects your sleep, eye health, and overall wellness. Learn about the latest blue light blocking solutions for 2025.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761864926/marwari1_azrf1z.jpg',
    images: [],
    category: 'Health',
    author: 'Dr. Sarah Johnson',
    publishedAt: '2025-01-20',
    readTime: 15
  },
  {
    id: 'health-blog-010',
    title: 'The Rise of Personalized Nutrition: DNA-Based Diet Plans in 2025.',
    excerpt: 'Explore how DNA testing and personalized nutrition are revolutionizing the way we approach diet and wellness. Learn about genetic testing for optimal health.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761864928/marwari2_hs4y31.jpg',
    images: [],
    category: 'Health',
    author: 'Dr. Michael Chen',
    publishedAt: '2025-01-22',
    readTime: 12
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
    readTime: 15
  },
  {
    id: 'beauty-blog-002',
    title: 'The Ultimate Guide to Skincare Routines',
    excerpt: 'Master the art of skincare with this comprehensive guide to building the perfect routine for your skin type.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863553/200300_n50ysr.png',
    images: [],
    category: 'Beauty',
    author: 'Sophia Martinez',
    publishedAt: '2024-11-15',
    readTime: 9
  },
  {
    id: 'beauty-blog-003',
    title: 'Hair Care Secrets from Ayurvedic Traditions',
    excerpt: 'Ancient wisdom meets modern science in these time-tested hair care techniques for stronger, shinier hair.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863544/800400_ljnnqg.png',
    images: [],
    category: 'Beauty',
    author: 'Priya Sharma',
    publishedAt: '2025-01-08',
    readTime: 12
  },
  {
    id: 'beauty-blog-004',
    title: 'The Science of Anti-Aging: Skincare Breakthroughs in 2025',
    excerpt: 'Explore the latest anti-aging skincare technologies and ingredients that are revolutionizing beauty routines in 2025.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863551/blog2-3_vldipi.png',
    images: [],
    category: 'Beauty',
    author: 'Emma Rodriguez',
    publishedAt: '2025-01-14',
    readTime: 15
  },
  {
    id: 'beauty-blog-005',
    title: 'CBD Beauty: The Wellness Ingredient Taking Over Skincare',
    excerpt: 'Discover how CBD is revolutionizing the beauty industry with its anti-inflammatory and calming properties for skin health.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863547/blog2-1_jakq66.png',
    images: [],
    category: 'Beauty',
    author: 'Sophia Martinez',
    publishedAt: '2025-01-16',
    readTime: 10
  },
  {
    id: 'beauty-blog-006',
    title: 'K-Beauty Trends: What\'s Hot in Korean Skincare for 2025',
    excerpt: 'Explore the latest Korean beauty trends and innovations that are setting the global skincare standard in 2025.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863544/800400_ljnnqg.png',
    images: [],
    category: 'Beauty',
    author: 'Priya Sharma',
    publishedAt: '2025-01-18',
    readTime: 10
  },
  {
    id: 'beauty-blog-007',
    title: 'Makeup Minimalism: The \'Less is More\' Beauty Movement',
    excerpt: 'Discover how the minimalist makeup trend is reshaping beauty standards with a focus on natural looks and skin health.',
    content: '',
    heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863553/200300_n50ysr.png',
    images: [],
    category: 'Beauty',
    author: 'Emma Rodriguez',
    publishedAt: '2025-01-20',
    readTime: 15
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
    readTime: 10
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
    readTime: 10
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
    
    // If not found in index, still try to load from full data
    // This fixes the issue where blogs not in the index couldn't be loaded
    const { blogs } = await import('@/data/blogs');
    return blogs.find(blog => blog.id === id);
  } catch (error) {
    // Error handling is done through UI feedback
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
    // Error handling is done through UI feedback
    return [];
  }
};

// Get blogs by category
export const getBlogsByCategory = async (category: string): Promise<Blog[]> => {
  try {
    // Load full blog data
    const { blogs } = await import('@/data/blogs');
    
    // Filter by category
    if (category === 'All') {
      return blogs;
    }
    
    return blogs.filter(blog => blog.category === category);
  } catch (error) {
    // Error handling is done through UI feedback
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
    // Error handling is done through UI feedback
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
    // Error handling is done through UI feedback
    return [];
  }
};

// Optimized function to get featured blogs for homepage
export const getFeaturedBlogs = async (): Promise<{ healthBlogs: Blog[], beautyBlogs: Blog[] }> => {
  try {
    // Use the lightweight index for featured blogs
    const healthBlogs = blogIndex
      .filter(blog => blog.category === 'Health')
      .slice(0, 3);
      
    const beautyBlogs = blogIndex
      .filter(blog => blog.category === 'Beauty')
      .slice(0, 3);
      
    return { healthBlogs, beautyBlogs };
  } catch (error) {
    // Error handling is done through UI feedback
    return { healthBlogs: [], beautyBlogs: [] };
  }
};
