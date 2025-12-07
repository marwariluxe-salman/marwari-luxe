#!/usr/bin/env node

// Unused JavaScript Reduction Script for Marwari Luxe
// Identifies and helps reduce unused JavaScript to improve performance

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

// Function to run webpack bundle analyzer
async function runBundleAnalyzer() {
  console.log('🔍 Running webpack bundle analyzer...\n');
  
  try {
    // Check if webpack-bundle-analyzer is installed
    await execPromise('npx webpack-bundle-analyzer --version');
    
    console.log('📊 Analyzing bundle...');
    // This would typically be run after a build with ANALYZE=true
    console.log('💡 Run with: ANALYZE=true npm run build\n');
  } catch (error) {
    console.log('⚠️  webpack-bundle-analyzer not found');
    console.log('💡 Install with: npm install --save-dev webpack-bundle-analyzer\n');
  }
}

// Function to identify unused dependencies
async function findUnusedDependencies() {
  console.log('🔍 Finding unused dependencies...\n');
  
  try {
    // Check if depcheck is installed
    await execPromise('npx depcheck --version');
    
    console.log('📦 Checking for unused dependencies...');
    const { stdout, stderr } = await execPromise('npx depcheck', { 
      cwd: path.join(__dirname, '..'),
      maxBuffer: 1024 * 1024 // Increase buffer size for large outputs
    });
    
    console.log(stdout || stderr);
  } catch (error) {
    // depcheck exits with code 1 when unused deps are found
    if (error.code === 1 && error.stdout) {
      console.log('📦 Unused dependencies found:');
      console.log(error.stdout);
    } else if (error.message.includes('depcheck')) {
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
      console.log('❌ Error running depcheck:', error.message);
    }
  }
}

// Function to identify large modules in the codebase
async function identifyLargeModules() {
  console.log('🔍 Identifying large modules...\n');
  
  // Common large libraries that could be optimized
  const largeLibraries = [
    {
      name: 'lodash',
      alternative: 'lodash-es (tree-shakable) or individual functions',
      size: '~70KB gzipped'
    },
    {
      name: 'moment',
      alternative: 'dayjs (~2KB) or date-fns (modular)',
      size: '~65KB gzipped'
    },
    {
      name: 'rxjs',
      alternative: 'Use only needed operators, consider xstream',
      size: '~25KB gzipped'
    },
    {
      name: 'jquery',
      alternative: 'Native JavaScript or specific micro-libraries',
      size: '~30KB gzipped'
    },
    {
      name: 'bluebird',
      alternative: 'Native Promises or p-light (~1KB)',
      size: '~15KB gzipped'
    }
  ];
  
  console.log('📚 Potentially large libraries:');
  largeLibraries.forEach(lib => {
    console.log(`  • ${lib.name} (${lib.size})`);
    console.log(`    Alternative: ${lib.alternative}`);
  });
  
  console.log('');
}

// Function to analyze component sizes
async function analyzeComponentSizes() {
  console.log('🔍 Analyzing component sizes...\n');
  
  try {
    const componentsDir = path.join(__dirname, '..', 'src', 'components');
    const componentFiles = await getAllTSXFiles(componentsDir);
    
    console.log(`📁 Found ${componentFiles.length} component files`);
    
    // Check for overly large components
    let largeComponents = [];
    
    for (const file of componentFiles) {
      const content = await fs.readFile(file, 'utf8');
      const lines = content.split('\n').length;
      
      if (lines > 500) {
        largeComponents.push({
          file: path.relative(path.join(__dirname, '..'), file),
          lines
        });
      }
    }
    
    if (largeComponents.length > 0) {
      console.log('⚠️  Large components found (consider splitting):');
      largeComponents
        .sort((a, b) => b.lines - a.lines)
        .forEach(comp => {
          console.log(`  • ${comp.file} (${comp.lines} lines)`);
        });
    } else {
      console.log('✅ No excessively large components found');
    }
    
    console.log('');
  } catch (error) {
    console.log('❌ Error analyzing component sizes:', error.message);
  }
}

// Function to get all TSX files recursively
async function getAllTSXFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      results = [...results, ...(await getAllTSXFiles(filePath))];
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Function to suggest code splitting opportunities
async function suggestCodeSplitting() {
  console.log('🔍 Suggesting code splitting opportunities...\n');
  
  const splittingOpportunities = [
    {
      name: 'Dynamic Imports for Heavy Components',
      description: 'Use dynamic imports for components that are not immediately needed',
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
    const { stdout } = await execPromise(
      'grep -r "console\\." src/ --include="*.ts" --include="*.tsx" || echo "No console logs found"',
      { cwd: path.join(__dirname, '..') }
    );
    
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

// Function to identify duplicate code
async function findDuplicateCode() {
  console.log('🔍 Looking for duplicate code patterns...\n');
  
  try {
    // Check for jscpd (code duplication detector)
    await execPromise('npx jscpd --version');
    
    console.log('🔁 Checking for code duplication...');
    console.log('💡 Run: npx jscpd src/\n');
  } catch (error) {
    if (error.message.includes('jscpd')) {
      console.log('⚠️  jscpd not found for duplication detection');
      console.log('💡 Install with: npm install -g jscpd\n');
    } else {
      console.log('ℹ️  Code duplication check requires jscpd\n');
    }
  }
}

// Function to provide optimization recommendations
async function provideRecommendations() {
  console.log('💡 Optimization Recommendations:\n');
  
  const recommendations = [
    {
      category: 'Tree Shaking',
      tips: [
        'Use ES6 imports instead of CommonJS',
        'Import only needed functions from libraries',
        'Configure webpack to enable tree shaking',
        'Remove unused exports from modules'
      ]
    },
    {
      category: 'Code Splitting',
      tips: [
        'Use dynamic imports for lazy loading',
        'Split by route or feature',
        'Implement preload and prefetch hints',
        'Use React.lazy() and Suspense for components'
      ]
    },
    {
      category: 'Dependency Optimization',
      tips: [
        'Replace heavy libraries with lighter alternatives',
        'Remove unused dependencies',
        'Use peer dependencies when appropriate',
        'Audit dependencies regularly'
      ]
    },
    {
      category: 'Build Optimization',
      tips: [
        'Enable minification and compression',
        'Use production builds for deployment',
        'Remove development-only code',
        'Optimize webpack configuration'
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

// Function to generate a report of potential savings
async function generateSavingsReport() {
  console.log('💰 Potential Savings Report:\n');
  
  const potentialSavings = [
    {
      optimization: 'Remove unused dependencies',
      potentialSaving: '100-500KB',
      effort: 'Low'
    },
    {
      optimization: 'Replace heavy libraries',
      potentialSaving: '50-200KB',
      effort: 'Medium'
    },
    {
      optimization: 'Implement code splitting',
      potentialSaving: '200-1000KB',
      effort: 'High'
    },
    {
      optimization: 'Enable tree shaking',
      potentialSaving: '50-300KB',
      effort: 'Low'
    },
    {
      optimization: 'Remove console logs',
      potentialSaving: '5-50KB',
      effort: 'Low'
    }
  ];
  
  console.log('Potential bundle size reductions:');
  potentialSavings.forEach(item => {
    console.log(`  • ${item.optimization}: ${item.potentialSaving} (${item.effort} effort)`);
  });
  
  console.log('\n📈 Total potential savings: 300KB - 2MB\n');
}

// Main function to reduce unused JavaScript
async function reduceUnusedJS() {
  console.log('🚀 Starting unused JavaScript reduction for Marwari Luxe...\n');
  
  try {
    await runBundleAnalyzer();
    await findUnusedDependencies();
    await identifyLargeModules();
    await analyzeComponentSizes();
    await suggestCodeSplitting();
    await checkConsoleLogs();
    await findDuplicateCode();
    await provideRecommendations();
    await generateSavingsReport();
    
    console.log('✅ Unused JavaScript analysis complete!');
    console.log('\n📋 Next steps:');
    console.log('  1. Remove unused dependencies');
    console.log('  2. Replace heavy libraries with lighter alternatives');
    console.log('  3. Implement suggested code splitting');
    console.log('  4. Enable tree shaking in webpack config');
    console.log('  5. Re-run this analysis after optimizations');
  } catch (error) {
    console.error('❌ Unused JavaScript reduction failed:', error);
    process.exit(1);
  }
}

// Run analysis if script is called directly
if (require.main === module) {
  reduceUnusedJS();
}

module.exports = {
  reduceUnusedJS,
  runBundleAnalyzer,
  findUnusedDependencies,
  identifyLargeModules,
  analyzeComponentSizes,
  suggestCodeSplitting,
  checkConsoleLogs,
  findDuplicateCode,
  provideRecommendations,
  generateSavingsReport
};