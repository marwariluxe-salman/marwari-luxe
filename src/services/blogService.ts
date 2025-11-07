import { Blog } from '@/types';

// Dynamically import the full blog data only when needed
export const getFullBlogData = async (): Promise<Blog[]> => {
  const { blogs } = await import('@/data/blogs');
  return blogs;
};

// Use the lightweight blog data for initial loads
export const getLightBlogData = async (): Promise<{
  healthBlogs: Blog[];
  beautyBlogs: Blog[];
  evergreenHealthBlogs: Blog[];
  evergreenBeautyBlogs: Blog[];
}> => {
  const { healthBlogs, beautyBlogs, evergreenHealthBlogs, evergreenBeautyBlogs } = await import('@/data/blogs-simple');
  return { healthBlogs, beautyBlogs, evergreenHealthBlogs, evergreenBeautyBlogs };
};

// Get a specific blog by ID
export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  const { blogs } = await import('@/data/blogs');
  return blogs.find(blog => blog.id === id);
};

// Get related blogs by category
export const getRelatedBlogs = async (categoryId: string, excludeId: string, limit: number = 3): Promise<Blog[]> => {
  const { blogs } = await import('@/data/blogs');
  return blogs
    .filter(blog => blog.category === categoryId && blog.id !== excludeId)
    .slice(0, limit);
};