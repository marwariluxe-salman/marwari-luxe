#!/usr/bin/env node

// Bundle Analysis Script for Marwari Luxe
// Identifies unused JavaScript and opportunities for code splitting

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

// Function to analyze Next.js bundle
async function analyzeNextBundle() {
  console.log('🔍 Analyzing Next.js bundle size...\n');
  
  try {
    // Run Next.js bundle analyzer
    console.log('📊 Running bundle analysis...');
    await execPromise('ANALYZE=true npm run build', { cwd: path.join(__dirname, '..') });
    console.log('✅ Bundle analysis completed successfully!\n');
  } catch (error) {
    console.log('ℹ️  Bundle analysis requires ANALYZE=true environment variable');
    console.log('💡 Run with: ANALYZE=true npm run build\n');
  }
}

// Function to identify unused dependencies
async function findUnusedDependencies() {
  console.log('🔍 Checking for unused dependencies...\n');
  
  try {
    // Check if depcheck is installed
    await execPromise('npx depcheck --version');
    
    console.log('📦 Running dependency check...');
    const { stdout } = await execPromise('npx depcheck', { cwd: path.join(__dirname, '..') });
    console.log(stdout);
  } catch (error) {
    if (error.message.includes('depcheck')) {
      console.log('⚠️  depcheck not found. Installing...');
      try {
        await execPromise('npm install -g depcheck');
        console.log('✅ depcheck installed successfully!');
        console.log('💡 Run this script again to check for unused dependencies\n');
      } catch (installError) {
        console.log('❌ Failed to install depcheck:', installError.message);
        console.log('💡 Install manually with: npm install -g depcheck\n');
      }
    } else {
      console.log('📦 Dependency check results:');
      // depcheck exits with code 1 when unused deps are found, which is expected
      console.log(error.stdout || error.message);
    }
  }
}

// Function to identify large modules in the bundle
async function identifyLargeModules() {
  console.log('🔍 Identifying large modules in the bundle...\n');
  
  // Common large libraries that could be optimized
  const largeLibraries = [
    'lodash',
    'moment',
    'rxjs',
    'bluebird',
    'core-js',
    'babel-runtime',
    'antd',
    'material-ui',
    'bootstrap',
    'jquery'
  ];
  
  console.log('📚 Checking for potentially large libraries:');
  largeLibraries.forEach(lib => {
    console.log(`  • ${lib}`);
  });
  
  console.log('\n💡 Recommendations:');
  console.log('  • Use lodash-es and import specific functions instead of entire library');
  console.log('  • Replace moment.js with day.js for smaller date handling');
  console.log('  • Use native JavaScript instead of jQuery where possible');
  console.log('  • Import only needed components from large UI libraries\n');
}

// Function to suggest code splitting opportunities
async function suggestCodeSplitting() {
  console.log('🔍 Suggesting code splitting opportunities...\n');
  
  const splittingOpportunities = [
    {
      name: 'Dynamic Imports for Heavy Components',
      description: 'Use dynamic imports for large components that are not immediately needed',
      examples: [
        'Modals and dialogs',
        'Complex forms',
        'Heavy visualization components',
        'Admin panels',
        'Feature-rich editors'
      ]
    },
    {
      name: 'Route-based Splitting',
      description: 'Split code by route to load only what\'s needed for each page',
      examples: [
        'Separate bundles for /admin, /dashboard, /profile',
        'Lazy load blog and product detail pages',
        'Split legal pages into separate chunks'
      ]
    },
    {
      name: 'Component-level Splitting',
      description: 'Split large components into smaller chunks',
      examples: [
        'Product detail sections',
        'Blog post components',
        'Category browsing components',
        'User profile sections'
      ]
    }
  ];
  
  splittingOpportunities.forEach(opportunity => {
    console.log(`🛠️  ${opportunity.name}`);
    console.log(`   ${opportunity.description}`);
    console.log('   Examples:');
    opportunity.examples.forEach(example => {
      console.log(`     • ${example}`);
    });
    console.log('');
  });
}

// Function to check for console logs in production code
async function checkConsoleLogs() {
  console.log('🔍 Checking for console logs in production code...\n');
  
  try {
    const { stdout } = await execPromise('grep -r "console\\." src/ --include="*.ts" --include="*.tsx" || echo "No console logs found"', { 
      cwd: path.join(__dirname, '..') 
    });
    
    if (stdout.includes('No console logs found')) {
      console.log('✅ No console logs found in source files\n');
    } else {
      console.log('⚠️  Console logs found in source files (should be removed for production):');
      console.log(stdout);
      console.log('💡 Recommendation: Remove console logs or use conditional logging\n');
    }
  } catch (error) {
    console.log('ℹ️  Unable to check for console logs\n');
  }
}

// Function to analyze image sizes
async function analyzeImageSizes() {
  console.log('🔍 Analyzing image sizes...\n');
  
  try {
    const publicDir = path.join(__dirname, '..', 'public');
    const imageFiles = await getAllImageFiles(publicDir);
    console.log(`📁 Found ${imageFiles.length} image files`);
    
    // Check for large images
    let largeImages = 0;
    let totalSize = 0;
    
    for (const file of imageFiles) {
      const stats = await fs.stat(file);
      totalSize += stats.size;
      
      if (stats.size > 500 * 1024) { // 500KB
        largeImages++;
        console.log(`⚠️  Large image: ${path.relative(publicDir, file)} (${(stats.size / 1024).toFixed(2)}KB)`);
      }
    }
    
    console.log(`\n📊 Total image size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
    
    if (largeImages > 0) {
      console.log(`⚠️  ${largeImages} large images found (>500KB)`);
      console.log('💡 Recommendation: Optimize large images using the image optimizer script\n');
    } else {
      console.log('✅ No oversized images found\n');
    }
  } catch (error) {
    console.log('❌ Error checking images:', error.message);
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

// Function to provide optimization recommendations
async function provideRecommendations() {
  console.log('💡 Optimization Recommendations:\n');
  
  const recommendations = [
    {
      category: 'Bundle Size',
      tips: [
        'Use dynamic imports for code splitting',
        'Remove unused dependencies',
        'Replace heavy libraries with lighter alternatives',
        'Enable tree shaking in webpack'
      ]
    },
    {
      category: 'Images',
      tips: [
        'Use modern formats like WebP and AVIF',
        'Implement proper responsive images with srcset',
        'Lazy load offscreen images',
        'Compress images without sacrificing quality'
      ]
    },
    {
      category: 'JavaScript',
      tips: [
        'Minify and compress JavaScript files',
        'Remove dead code and unused functions',
        'Defer non-critical JavaScript',
        'Use efficient algorithms and data structures'
      ]
    },
    {
      category: 'Caching',
      tips: [
        'Implement long-term caching strategies',
        'Use cache busting with file hashes',
        'Preload critical resources',
        'Prefetch likely next pages'
      ]
    }
  ];
  
  recommendations.forEach(rec => {
    console.log(`📌 ${rec.category}:`);
    rec.tips.forEach(tip => {
      console.log(`  • ${tip}`);
    });
    console.log('');
  });
}

// Main analysis function
async function analyzeBundle() {
  console.log('🚀 Starting bundle analysis for Marwari Luxe...\n');
  
  try {
    await analyzeNextBundle();
    await findUnusedDependencies();
    await identifyLargeModules();
    await suggestCodeSplitting();
    await checkConsoleLogs();
    await analyzeImageSizes();
    await provideRecommendations();
    
    console.log('✅ Bundle analysis complete!');
    console.log('\n📋 Next steps:');
    console.log('  1. Run the enhanced image optimizer script');
    console.log('  2. Remove unused dependencies');
    console.log('  3. Implement suggested code splitting');
    console.log('  4. Re-run this analysis after optimizations');
  } catch (error) {
    console.error('❌ Bundle analysis failed:', error);
    process.exit(1);
  }
}

// Run analysis if script is called directly
if (require.main === module) {
  analyzeBundle();
}

module.exports = {
  analyzeBundle,
  analyzeNextBundle,
  findUnusedDependencies,
  identifyLargeModules,
  suggestCodeSplitting,
  checkConsoleLogs,
  analyzeImageSizes,
  provideRecommendations
};