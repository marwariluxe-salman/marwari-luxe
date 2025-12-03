#!/usr/bin/env node

// Comprehensive performance optimization script for Marwari Luxe
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

async function checkPerformanceIssues() {
  console.log('🔍 Checking for performance issues...\n');
  
  try {
    // 1. Check bundle size
    console.log('1. Analyzing bundle size...');
    try {
      await execPromise('npm run analyze');
      console.log('   ✅ Bundle analysis completed');
    } catch (error) {
      console.log('   ℹ️  Bundle analysis skipped (requires ANALYZE=true environment variable)');
    }
    
    // 2. Check for unused dependencies
    console.log('\n2. Checking for unused dependencies...');
    try {
      await execPromise('npx depcheck');
      console.log('   ✅ Dependency check completed');
    } catch (error) {
      console.log('   ℹ️  depcheck not installed. Install with: npm install -g depcheck');
    }
    
    // 3. Check for console logs in production code
    console.log('\n3. Checking for console logs in production code...');
    try {
      const { stdout } = await execPromise('grep -r "console\\." src/ --include="*.ts" --include="*.tsx" || echo "No console logs found"');
      if (stdout.includes('No console logs found')) {
        console.log('   ✅ No console logs found in source files');
      } else {
        console.log('   ⚠️  Console logs found in source files (should be removed for production)');
      }
    } catch (error) {
      console.log('   ℹ️  Unable to check for console logs');
    }
    
    // 4. Check image optimization
    console.log('\n4. Checking image optimization...');
    try {
      const publicDir = path.join(__dirname, '..', 'public');
      const imageFiles = await getAllImageFiles(publicDir);
      console.log(`   📁 Found ${imageFiles.length} image files`);
      
      // Check for large images
      let largeImages = 0;
      for (const file of imageFiles) {
        const stats = await fs.stat(file);
        if (stats.size > 500 * 1024) { // 500KB
          largeImages++;
        }
      }
      
      if (largeImages > 0) {
        console.log(`   ⚠️  ${largeImages} large images found (>500KB)`);
      } else {
        console.log('   ✅ No oversized images found');
      }
    } catch (error) {
      console.log('   ❌ Error checking images:', error.message);
    }
    
    // 5. Check for proper lazy loading
    console.log('\n5. Checking lazy loading implementation...');
    try {
      const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
      const layoutContent = await fs.readFile(layoutPath, 'utf8');
      
      if (layoutContent.includes('loading="lazy"') || layoutContent.includes('IntersectionObserver')) {
        console.log('   ✅ Lazy loading implementation detected');
      } else {
        console.log('   ⚠️  Consider implementing lazy loading for images');
      }
    } catch (error) {
      console.log('   ❌ Error checking lazy loading:', error.message);
    }
    
    // 6. Check font optimization
    console.log('\n6. Checking font optimization...');
    try {
      const globalsPath = path.join(__dirname, '..', 'src', 'app', 'globals.css');
      const globalsContent = await fs.readFile(globalsPath, 'utf8');
      
      if (globalsContent.includes('font-display: swap')) {
        console.log('   ✅ Font optimization with font-display: swap detected');
      } else {
        console.log('   ⚠️  Consider adding font-display: swap for better font loading');
      }
    } catch (error) {
      console.log('   ❌ Error checking font optimization:', error.message);
    }
    
    console.log('\n✅ Performance check completed!');
    
  } catch (error) {
    console.error('❌ Performance check failed:', error);
  }
}

// Function to get all image files recursively
async function getAllImageFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      results = [...results, ...(await getAllImageFiles(filePath))];
    } else if (
      file.endsWith('.jpg') || 
      file.endsWith('.jpeg') || 
      file.endsWith('.png') || 
      file.endsWith('.webp') || 
      file.endsWith('.avif') ||
      file.endsWith('.gif')
    ) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Function to optimize performance
async function optimizePerformance() {
  console.log('🚀 Starting performance optimization...\n');
  
  try {
    // 1. Optimize images
    console.log('1. Optimizing images...');
    try {
      await execPromise('npm run optimize-images');
      console.log('   ✅ Images optimized');
    } catch (error) {
      console.log('   ❌ Image optimization failed:', error.message);
    }
    
    // 2. Generate optimized sitemap
    console.log('\n2. Generating optimized sitemap...');
    try {
      await execPromise('npm run generate-sitemap');
      console.log('   ✅ Sitemap generated');
    } catch (error) {
      console.log('   ❌ Sitemap generation failed:', error.message);
    }
    
    // 3. Check GTM implementation
    console.log('\n3. Checking GTM implementation...');
    try {
      await execPromise('npm run check-gtm');
      console.log('   ✅ GTM check completed');
    } catch (error) {
      console.log('   ❌ GTM check failed:', error.message);
    }
    
    // 4. Run build with analysis
    console.log('\n4. Running build with analysis...');
    try {
      await execPromise('npm run analyze');
      console.log('   ✅ Build analysis completed');
    } catch (error) {
      console.log('   ℹ️  Build analysis requires ANALYZE=true environment variable');
    }
    
    console.log('\n✅ Performance optimization completed!');
    console.log('\n📋 Next steps:');
    console.log('   1. Test with Lighthouse/PageSpeed Insights');
    console.log('   2. Check Core Web Vitals in Search Console');
    console.log('   3. Monitor real-world performance with analytics');
    
  } catch (error) {
    console.error('❌ Performance optimization failed:', error);
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--check')) {
    await checkPerformanceIssues();
  } else if (args.includes('--optimize')) {
    await optimizePerformance();
  } else {
    console.log('Usage:');
    console.log('  node scripts/optimize-performance.js --check     Check for performance issues');
    console.log('  node scripts/optimize-performance.js --optimize  Run performance optimizations');
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  checkPerformanceIssues,
  optimizePerformance
};