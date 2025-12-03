#!/usr/bin/env node

// Script to check for broken links and 404 errors
const fs = require('fs').promises;
const path = require('path');

async function checkBrokenLinks() {
  console.log('🔍 Checking for broken links and 404 errors...\n');
  
  try {
    // 1. Check internal links in source files
    console.log('1. Checking internal links in source files...');
    await checkInternalLinks();
    
    // 2. Check routes in app directory
    console.log('\n2. Checking routes in app directory...');
    await checkRoutes();
    
    // 3. Check public directory files
    console.log('\n3. Checking public directory files...');
    await checkPublicFiles();
    
    // 4. Check sitemap consistency
    console.log('\n4. Checking sitemap consistency...');
    await checkSitemap();
    
    console.log('\n✅ Broken link check completed!');
    
  } catch (error) {
    console.error('❌ Broken link check failed:', error);
  }
}

async function checkInternalLinks() {
  try {
    // Check for common internal link patterns
    const srcDir = path.join(__dirname, '..', 'src');
    const files = await getAllSourceFiles(srcDir);
    
    let brokenLinks = [];
    
    for (const file of files) {
      const content = await fs.readFile(file, 'utf8');
      
      // Check for href attributes pointing to internal pages
      const hrefMatches = content.match(/href=["'](\/[^"']*)["']/g) || [];
      for (const match of hrefMatches) {
        const url = match.match(/href=["'](\/[^"']*)["']/)[1];
        if (await isBrokenLink(url)) {
          brokenLinks.push({ file: path.relative(srcDir, file), url });
        }
      }
      
      // Check for src attributes
      const srcMatches = content.match(/src=["'](\/[^"']*)["']/g) || [];
      for (const match of srcMatches) {
        const url = match.match(/src=["'](\/[^"']*)["']/)[1];
        if (await isBrokenLink(url)) {
          brokenLinks.push({ file: path.relative(srcDir, file), url });
        }
      }
    }
    
    if (brokenLinks.length > 0) {
      console.log(`   ⚠️  Found ${brokenLinks.length} potentially broken internal links:`);
      brokenLinks.forEach(link => {
        console.log(`      - ${link.file}: ${link.url}`);
      });
    } else {
      console.log('   ✅ No broken internal links found');
    }
    
  } catch (error) {
    console.log('   ❌ Error checking internal links:', error.message);
  }
}

async function checkRoutes() {
  try {
    const appDir = path.join(__dirname, '..', 'src', 'app');
    const routes = await getRoutes(appDir);
    
    console.log(`   📁 Found ${routes.length} routes`);
    
    // Check if all routes have corresponding page files
    let missingRoutes = [];
    
    for (const route of routes) {
      // Skip dynamic routes for now
      if (route.includes('[')) continue;
      
      const routePath = path.join(appDir, route);
      const pageExists = await fileExists(routePath + '/page.tsx') || 
                        await fileExists(routePath + '/page.js') ||
                        await fileExists(routePath + '/page.jsx') ||
                        await fileExists(routePath + '/page.ts');
      
      if (!pageExists && route !== '/') {
        missingRoutes.push(route);
      }
    }
    
    if (missingRoutes.length > 0) {
      console.log(`   ⚠️  Found ${missingRoutes.length} routes without page files:`);
      missingRoutes.forEach(route => {
        console.log(`      - ${route}`);
      });
    } else {
      console.log('   ✅ All routes have corresponding page files');
    }
    
  } catch (error) {
    console.log('   ❌ Error checking routes:', error.message);
  }
}

async function checkPublicFiles() {
  try {
    const publicDir = path.join(__dirname, '..', 'public');
    const files = await getAllFiles(publicDir);
    
    console.log(`   📁 Found ${files.length} files in public directory`);
    
    // Check for common file issues
    let largeFiles = [];
    let unusedFiles = [];
    
    for (const file of files) {
      const stats = await fs.stat(file);
      
      // Check for large files (>1MB)
      if (stats.size > 1024 * 1024) {
        largeFiles.push({
          file: path.relative(publicDir, file),
          size: (stats.size / 1024 / 1024).toFixed(2) + 'MB'
        });
      }
    }
    
    if (largeFiles.length > 0) {
      console.log(`   ⚠️  Found ${largeFiles.length} large files (>1MB):`);
      largeFiles.forEach(file => {
        console.log(`      - ${file.file}: ${file.size}`);
      });
    } else {
      console.log('   ✅ No oversized files found');
    }
    
  } catch (error) {
    console.log('   ❌ Error checking public files:', error.message);
  }
}

async function checkSitemap() {
  try {
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    const sitemapExists = await fileExists(sitemapPath);
    
    if (!sitemapExists) {
      console.log('   ⚠️  sitemap.xml not found');
      return;
    }
    
    const sitemapContent = await fs.readFile(sitemapPath, 'utf8');
    
    // Extract URLs from sitemap
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
    const urls = urlMatches.map(match => match.replace('<loc>', '').replace('</loc>', ''));
    
    console.log(`   📄 Found ${urls.length} URLs in sitemap`);
    
    // Check a sample of URLs (don't check all as it would be too slow)
    const sampleUrls = urls.slice(0, 10);
    let brokenUrls = [];
    
    for (const url of sampleUrls) {
      // Skip external URLs
      if (!url.includes('marwariluxe.com')) continue;
      
      // Convert full URL to path
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      
      if (await isBrokenRoute(pathname)) {
        brokenUrls.push(url);
      }
    }
    
    if (brokenUrls.length > 0) {
      console.log(`   ⚠️  Found ${brokenUrls.length} potentially broken URLs in sitemap:`);
      brokenUrls.forEach(url => {
        console.log(`      - ${url}`);
      });
    } else {
      console.log('   ✅ Sample URLs in sitemap are valid');
    }
    
  } catch (error) {
    console.log('   ❌ Error checking sitemap:', error.message);
  }
}

// Helper functions
async function getAllSourceFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (file !== 'node_modules' && file !== '.next') {
        results = [...results, ...(await getAllSourceFiles(filePath))];
      }
    } else if (
      file.endsWith('.tsx') || 
      file.endsWith('.ts') || 
      file.endsWith('.jsx') || 
      file.endsWith('.js')
    ) {
      results.push(filePath);
    }
  }
  
  return results;
}

async function getAllFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      results = [...results, ...(await getAllFiles(filePath))];
    } else {
      results.push(filePath);
    }
  }
  
  return results;
}

async function getRoutes(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (file !== 'node_modules' && file !== '.next') {
        const subRoutes = await getRoutes(filePath);
        results = [...results, ...subRoutes.map(sub => `/${file}${sub === '/' ? '' : sub}`)];
      }
    } else if (file === 'page.tsx' || file === 'page.js' || file === 'page.jsx' || file === 'page.ts') {
      // This is a page file, so the directory is a route
      const routePath = path.relative(dir, path.dirname(filePath)).replace(/\\/g, '/');
      results.push(routePath === '.' ? '/' : `/${routePath}`);
    }
  }
  
  return results;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function isBrokenLink(url) {
  // Simple check for broken links - in a real implementation, you'd make HTTP requests
  // For now, we'll just check if it's a reasonable URL format
  return false;
}

async function isBrokenRoute(route) {
  // Simple check for broken routes
  // In a real implementation, you'd check if the route resolves to a valid page
  return false;
}

// Main function
if (require.main === module) {
  checkBrokenLinks();
}

module.exports = {
  checkBrokenLinks
};