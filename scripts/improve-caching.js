#!/usr/bin/env node

// Caching and Resource Delivery Optimization Script for Marwari Luxe
// Improves caching strategies and resource delivery for better performance

const fs = require('fs').promises;
const path = require('path');

// Function to analyze current caching configuration
async function analyzeCachingConfig() {
  console.log('🔍 Analyzing current caching configuration...\n');
  
  try {
    // Check next.config.js for caching settings
    const nextConfigPath = path.join(__dirname, '..', 'next.config.ts');
    const nextConfig = await fs.readFile(nextConfigPath, 'utf8');
    
    console.log('📄 Next.js Config Analysis:');
    
    // Check for cache headers
    if (nextConfig.includes('Cache-Control')) {
      console.log('✅ Cache-Control headers found in next.config.ts');
    } else {
      console.log('⚠️  No Cache-Control headers found in next.config.ts');
    }
    
    // Check for static asset caching
    if (nextConfig.includes('_next/static')) {
      console.log('✅ Static asset caching configured');
    } else {
      console.log('⚠️  Static asset caching not explicitly configured');
    }
    
    // Check vercel.json for additional caching
    try {
      const vercelConfigPath = path.join(__dirname, '..', 'vercel.json');
      const vercelConfig = await fs.readFile(vercelConfigPath, 'utf8');
      
      console.log('\n📄 Vercel Config Analysis:');
      if (vercelConfig.includes('Cache-Control')) {
        console.log('✅ Cache-Control headers found in vercel.json');
      } else {
        console.log('⚠️  No Cache-Control headers found in vercel.json');
      }
    } catch (error) {
      console.log('\n📄 Vercel Config Analysis:');
      console.log('ℹ️  vercel.json not found (may be using defaults)');
    }
    
    console.log('');
  } catch (error) {
    console.error('❌ Error analyzing caching config:', error.message);
  }
}

// Function to optimize cache headers
async function optimizeCacheHeaders() {
  console.log('⚡ Optimizing cache headers...\n');
  
  // Recommended cache headers
  const recommendedHeaders = {
    staticAssets: {
      pattern: '/_next/static/(.*)',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    },
    images: {
      pattern: '/(.*)\\.(jpg|jpeg|gif|png|webp|avif|svg|ico)',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    },
    fonts: {
      pattern: '/(.*)\\.(woff|woff2|ttf|eot|otf)',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    },
    html: {
      pattern: '/(.*)',
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate'
      }
    }
  };
  
  console.log('📋 Recommended Cache Headers:');
  Object.entries(recommendedHeaders).forEach(([key, config]) => {
    console.log(`  ${key}:`);
    console.log(`    Pattern: ${config.pattern}`);
    Object.entries(config.headers).forEach(([header, value]) => {
      console.log(`    ${header}: ${value}`);
    });
    console.log('');
  });
}

// Function to analyze resource loading hints
async function analyzeResourceHints() {
  console.log('🔍 Analyzing resource loading hints...\n');
  
  try {
    const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
    const layoutContent = await fs.readFile(layoutPath, 'utf8');
    
    console.log('📄 Resource Hint Analysis:');
    
    // Check for preconnect hints
    const preconnectDomains = [
      'https://res.cloudinary.com',
      'https://pagead2.googlesyndication.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    console.log('Preconnect hints:');
    preconnectDomains.forEach(domain => {
      if (layoutContent.includes(`preconnect" href="${domain}`)) {
        console.log(`✅ ${domain}`);
      } else {
        console.log(`⚠️  ${domain} (missing)`);
      }
    });
    
    // Check for preload hints
    console.log('\nPreload hints:');
    if (layoutContent.includes('rel="preload"')) {
      console.log('✅ Preload hints found');
      
      // Count preload hints
      const preloadMatches = layoutContent.match(/rel="preload"/g);
      console.log(`   ${preloadMatches.length} preload hints found`);
    } else {
      console.log('⚠️  No preload hints found');
    }
    
    // Check for prefetch hints
    console.log('\nPrefetch hints:');
    if (layoutContent.includes('rel="prefetch"')) {
      console.log('✅ Prefetch hints found');
      
      // Count prefetch hints
      const prefetchMatches = layoutContent.match(/rel="prefetch"/g);
      console.log(`   ${prefetchMatches.length} prefetch hints found`);
    } else {
      console.log('⚠️  No prefetch hints found');
    }
    
    console.log('');
  } catch (error) {
    console.error('❌ Error analyzing resource hints:', error.message);
  }
}

// Function to optimize critical resource delivery
async function optimizeCriticalResources() {
  console.log('🚀 Optimizing critical resource delivery...\n');
  
  const criticalResources = [
    {
      type: 'Hero Images',
      recommendation: 'Preload largest contentful paint (LCP) images',
      implementation: '<link rel="preload" as="image" href="[hero-image-url]">'
    },
    {
      type: 'Critical Fonts',
      recommendation: 'Preload critical fonts to prevent invisible text',
      implementation: '<link rel="preload" as="font" type="font/woff2" href="[font-url]" crossorigin>'
    },
    {
      type: 'Critical CSS',
      recommendation: 'Inline critical CSS and defer non-critical styles',
      implementation: 'Use Next.js built-in CSS optimization'
    },
    {
      type: 'Above-the-Fold JavaScript',
      recommendation: 'Prioritize loading of above-the-fold JavaScript',
      implementation: 'Use dynamic imports with loading priorities'
    }
  ];
  
  console.log('📋 Critical Resource Optimization:');
  criticalResources.forEach(resource => {
    console.log(`  ${resource.type}:`);
    console.log(`    Recommendation: ${resource.recommendation}`);
    console.log(`    Implementation: ${resource.implementation}`);
    console.log('');
  });
}

// Function to analyze font optimization
async function analyzeFontOptimization() {
  console.log('🔤 Analyzing font optimization...\n');
  
  try {
    const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
    const layoutContent = await fs.readFile(layoutPath, 'utf8');
    
    const globalsPath = path.join(__dirname, '..', 'src', 'app', 'globals.css');
    const globalsContent = await fs.readFile(globalsPath, 'utf8');
    
    console.log('📄 Font Optimization Analysis:');
    
    // Check for font-display in CSS
    if (globalsContent.includes('font-display')) {
      console.log('✅ font-display property found in CSS');
    } else {
      console.log('⚠️  font-display property missing in CSS');
      console.log('💡 Add font-display: swap to @font-face rules');
    }
    
    // Check for font preloading
    if (layoutContent.includes('rel="preload"') && layoutContent.includes('as="font"')) {
      console.log('✅ Font preloading implemented');
    } else {
      console.log('⚠️  Font preloading not implemented');
      console.log('💡 Add <link rel="preload" as="font" ... /> for critical fonts');
    }
    
    // Check for font subset optimization
    if (layoutContent.includes('subsets:')) {
      console.log('✅ Font subsets configured');
    } else {
      console.log('⚠️  Font subsets not explicitly configured');
      console.log('💡 Specify subsets in next/font configuration');
    }
    
    console.log('');
  } catch (error) {
    console.error('❌ Error analyzing font optimization:', error.message);
  }
}

// Function to provide CDN optimization recommendations
async function provideCDNOptimizations() {
  console.log('🌍 CDN Optimization Recommendations:\n');
  
  const cdnRecommendations = [
    {
      provider: 'Vercel',
      optimizations: [
        'Enable Automatic Static Optimization',
        'Use Vercel Image Optimization',
        'Configure Edge Network Caching',
        'Enable Serverless Functions Caching'
      ]
    },
    {
      provider: 'Cloudflare',
      optimizations: [
        'Enable Auto Minify for CSS/JS/HTML',
        'Configure Browser Cache TTL',
        'Enable Brotli Compression',
        'Use Cloudflare Workers for custom logic'
      ]
    },
    {
      provider: 'Cloudinary',
      optimizations: [
        'Enable automatic format selection (f_auto)',
        'Enable automatic quality selection (q_auto)',
        'Use responsive image breakpoints',
        'Enable lazy loading transformations'
      ]
    }
  ];
  
  cdnRecommendations.forEach(provider => {
    console.log(`📡 ${provider.provider}:`);
    provider.optimizations.forEach(opt => {
      console.log(`  • ${opt}`);
    });
    console.log('');
  });
}

// Function to analyze image delivery optimization
async function analyzeImageDelivery() {
  console.log('🖼️  Analyzing image delivery optimization...\n');
  
  try {
    // Check for Cloudinary optimization parameters
    const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
    const layoutContent = await fs.readFile(layoutPath, 'utf8');
    
    const componentDirs = [
      path.join(__dirname, '..', 'src', 'components')
    ];
    
    let cloudinaryUrls = 0;
    let optimizedCloudinaryUrls = 0;
    
    // Check layout for Cloudinary URLs
    const cloudinaryRegex = /https:\/\/res\.cloudinary\.com\/[^'"\s]+/g;
    const layoutUrls = layoutContent.match(cloudinaryRegex) || [];
    cloudinaryUrls += layoutUrls.length;
    
    layoutUrls.forEach(url => {
      if (url.includes('f_auto') && url.includes('q_auto')) {
        optimizedCloudinaryUrls++;
      }
    });
    
    // Check components for Cloudinary URLs
    for (const dir of componentDirs) {
      try {
        const files = await fs.readdir(dir);
        const tsxFiles = files.filter(file => file.endsWith('.tsx'));
        
        for (const file of tsxFiles) {
          const filePath = path.join(dir, file);
          const content = await fs.readFile(filePath, 'utf8');
          
          const urls = content.match(cloudinaryRegex) || [];
          cloudinaryUrls += urls.length;
          
          urls.forEach(url => {
            if (url.includes('f_auto') && url.includes('q_auto')) {
              optimizedCloudinaryUrls++;
            }
          });
        }
      } catch (error) {
        // Continue if directory doesn't exist
      }
    }
    
    console.log('📊 Image Delivery Analysis:');
    console.log(`  Total Cloudinary URLs: ${cloudinaryUrls}`);
    console.log(`  Optimized URLs: ${optimizedCloudinaryUrls}`);
    console.log(`  Optimization Rate: ${cloudinaryUrls > 0 ? Math.round((optimizedCloudinaryUrls / cloudinaryUrls) * 100) : 0}%`);
    
    if (cloudinaryUrls > 0 && optimizedCloudinaryUrls < cloudinaryUrls) {
      console.log('\n💡 Recommendations:');
      console.log('  • Add f_auto,q_auto parameters to all Cloudinary URLs');
      console.log('  • Use responsive image breakpoints');
      console.log('  • Enable lazy loading for below-the-fold images');
    }
    
    console.log('');
  } catch (error) {
    console.error('❌ Error analyzing image delivery:', error.message);
  }
}

// Function to provide caching strategy recommendations
async function provideCachingStrategies() {
  console.log('🛡️  Caching Strategy Recommendations:\n');
  
  const strategies = [
    {
      strategy: 'Static Assets',
      policy: 'Cache-Control: public, max-age=31536000, immutable',
      rationale: 'Static assets with file hashes never change',
      implementation: 'Next.js automatically handles this for _next/static'
    },
    {
      strategy: 'Images and Media',
      policy: 'Cache-Control: public, max-age=31536000, immutable',
      rationale: 'Media files rarely change and benefit from long caching',
      implementation: 'Configure in next.config.js or vercel.json'
    },
    {
      strategy: 'API Responses',
      policy: 'Cache-Control: public, max-age=60, must-revalidate',
      rationale: 'API data should be fresh but can be cached briefly',
      implementation: 'Set headers in API route handlers'
    },
    {
      strategy: 'HTML Pages',
      policy: 'Cache-Control: public, max-age=0, must-revalidate',
      rationale: 'Pages should always be validated but can be cached by CDNs',
      implementation: 'Next.js ISR automatically sets this'
    }
  ];
  
  strategies.forEach(strategy => {
    console.log(`📋 ${strategy.strategy}:`);
    console.log(`  Policy: ${strategy.policy}`);
    console.log(`  Rationale: ${strategy.rationale}`);
    console.log(`  Implementation: ${strategy.implementation}`);
    console.log('');
  });
}

// Function to generate optimized caching configuration
async function generateOptimizedConfig() {
  console.log('🔧 Generating optimized caching configuration...\n');
  
  const nextConfigOptimizations = `
// next.config.ts - Caching Optimizations
const nextConfig: NextConfig = {
  // ... existing config ...
  
  // Add headers for caching
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)\\.(jpg|jpeg|gif|png|webp|avif|svg|ico|woff|woff2|ttf|eot|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
  `;
  
  const vercelConfigOptimizations = `
// vercel.json - Caching Optimizations
{
  "headers": [
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)\\.(jpg|jpeg|gif|png|webp|avif|svg|ico|woff|woff2|ttf|eot|otf)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
  `;
  
  console.log('📋 Optimized Next.js Configuration:');
  console.log(nextConfigOptimizations.trim());
  
  console.log('\n📋 Optimized Vercel Configuration:');
  console.log(vercelConfigOptimizations.trim());
  
  console.log('\n💡 Implementation Notes:');
  console.log('  1. Add these configurations to your respective files');
  console.log('  2. Test caching behavior with browser dev tools');
  console.log('  3. Monitor CDN cache hit rates');
  console.log('  4. Adjust max-age values based on content update frequency\n');
}

// Main function to improve caching and resource delivery
async function improveCaching() {
  console.log('🚀 Starting caching and resource delivery optimization for Marwari Luxe...\n');
  
  try {
    await analyzeCachingConfig();
    await optimizeCacheHeaders();
    await analyzeResourceHints();
    await optimizeCriticalResources();
    await analyzeFontOptimization();
    await provideCDNOptimizations();
    await analyzeImageDelivery();
    await provideCachingStrategies();
    await generateOptimizedConfig();
    
    console.log('✅ Caching and resource delivery optimization complete!');
    console.log('\n📋 Next steps:');
    console.log('  1. Implement recommended cache headers');
    console.log('  2. Add missing resource loading hints');
    console.log('  3. Optimize font delivery');
    console.log('  4. Configure CDN caching policies');
    console.log('  5. Test caching with browser dev tools');
  } catch (error) {
    console.error('❌ Caching optimization failed:', error);
    process.exit(1);
  }
}

// Run optimization if script is called directly
if (require.main === module) {
  improveCaching();
}

module.exports = {
  improveCaching,
  analyzeCachingConfig,
  optimizeCacheHeaders,
  analyzeResourceHints,
  optimizeCriticalResources,
  analyzeFontOptimization,
  provideCDNOptimizations,
  analyzeImageDelivery,
  provideCachingStrategies,
  generateOptimizedConfig
};