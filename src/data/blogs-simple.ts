import { blogs } from '@/data/blogs';

export const healthBlogs = blogs.filter(blog => blog.category === 'Health');
export const beautyBlogs = blogs.filter(blog => blog.category === 'Beauty');
export const evergreenHealthBlogs = blogs.filter(blog => blog.category === 'Evergreen Health');
export const evergreenBeautyBlogs = blogs.filter(blog => blog.category === 'Evergreen Beauty');