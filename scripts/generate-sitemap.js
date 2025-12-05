#!/usr/bin/env node

// Script to generate sitemap.xml dynamically based on tools data
const fs = require('fs').promises;
const path = require('path');

// Read tools data directly from file since we can't import ES modules in CommonJS
async function readToolsData() {
  const toolsPath = path.join(__dirname, '..', 'src', 'data', 'tools.ts');
  const toolsContent = await fs.readFile(toolsPath, 'utf8');
  
  // Extract the tools array using regex
  const toolsMatch = toolsContent.match(/export const tools: Tool\[] = \[([\s\S]*?)\];/);
  if (!toolsMatch) {
    throw new Error('Could not find tools array in tools.ts');
  }
  
  // Parse the tools data (simplified approach)
  // We'll extract just the IDs from the tools data
  const toolsIds = [];
  const toolMatches = toolsContent.matchAll(/id: '([^']+)'/g);
  for (const match of toolMatches) {
    toolsIds.push(match[1]);
  }
  
  return toolsIds;
}

// Read blog data directly from file
async function readBlogData() {
  const blogsPath = path.join(__dirname, '..', 'src', 'data', 'blogs.ts');
  const blogsContent = await fs.readFile(blogsPath, 'utf8');
  
  // Extract the blog IDs using specific patterns
  const blogIds = [];
  
  // Match all blog IDs with the pattern xxx-blog-xxx or evergreen-xxx
  const blogMatches = blogsContent.matchAll(/^\s*id:\s*'((?:health|beauty|evergreen)-blog-[\d\w-]+)'/gm);
  for (const match of blogMatches) {
    blogIds.push(match[1]);
  }
  
  // Also match evergreen blogs
  const evergreenMatches = blogsContent.matchAll(/^\s*id:\s*'(evergreen-(?:health|beauty)-[\d\w-]+)'/gm);
  for (const match of evergreenMatches) {
    blogIds.push(match[1]);
  }
  
  return blogIds;
}

// Base URLs
const BASE_URL = 'https://marwariluxe.com';

// Static pages that should always be included
const STATIC_PAGES = [
  '/',
  '/about',
  '/products',
  '/categories/health',
  '/categories/beauty',
  '/blogs',
  '/tools',
  '/contact',
  '/legal/privacy-policy',
  '/legal/terms',
  '/legal/refund-policy',
  '/legal/disclaimer',
  '/legal/faq',
  '/checkout',
  '/tools/general',
  '/tools/health',
  '/tools/beauty'
];

// Function to generate sitemap XML
function generateSitemapXML(toolsIds, blogIds) {
  const now = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Automatically generated sitemap for Marwari Luxe -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  // Add static pages
  STATIC_PAGES.forEach(page => {
    const priority = page === '/' ? '1.0' : 
                    ['/about', '/products', '/blogs', '/tools'].includes(page) ? '0.9' :
                    ['/categories/health', '/categories/beauty'].includes(page) ? '0.8' :
                    ['/contact'].includes(page) ? '0.7' : '0.6';
                    
    const changefreq = page === '/' ? 'daily' :
                      ['/about', '/contact'].includes(page) ? 'monthly' :
                      ['/legal/privacy-policy', '/legal/terms', '/legal/refund-policy', '/legal/disclaimer'].includes(page) ? 'yearly' :
                      page.startsWith('/legal/') ? 'monthly' : 'weekly';
    
    xml += `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });
  
  // Add blog posts
  blogIds.forEach(blogId => {
    xml += `
  <url>
    <loc>${BASE_URL}/blogs/${blogId}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });
  
  // Add products (hardcoded for now, but could be read from products.ts)
  const PRODUCTS = [
    '/products/health-001',
    '/products/health-002',
    '/products/health-003',
    '/products/health-004',
    '/products/health-005',
    '/products/beauty-001',
    '/products/beauty-002',
    '/products/beauty-003',
    '/products/beauty-004',
    '/products/beauty-005'
  ];
  
  PRODUCTS.forEach(product => {
    xml += `
  <url>
    <loc>${BASE_URL}${product}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });
  
  // Add individual tools
  toolsIds.forEach(toolId => {
    xml += `
  <url>
    <loc>${BASE_URL}/tools/${toolId}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });
  
  xml += `
</urlset>`;
  
  return xml;
}

// Main function to generate and save sitemap
async function generateSitemap() {
  try {
    console.log('Generating sitemap...');
    
    // Read tools data
    const toolsIds = await readToolsData();
    
    // Read blog data
    const blogIds = await readBlogData();
    
    // Generate XML
    const sitemapXML = generateSitemapXML(toolsIds, blogIds);
    
    // Write to public directory
    const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    await fs.writeFile(outputPath, sitemapXML);
    
    console.log(`✅ Sitemap generated successfully with ${STATIC_PAGES.length + blogIds.length + 10 + toolsIds.length} URLs`);
    console.log(`📁 Saved to: ${outputPath}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemap();
}

module.exports = {
  generateSitemap,
  generateSitemapXML
};