#!/usr/bin/env node

// Third-Party Script Optimization Script for Marwari Luxe
// Focuses on optimizing Adsense, GTM, and other third-party scripts for better performance

const fs = require('fs').promises;
const path = require('path');

// Function to optimize Google Tag Manager implementation
async function optimizeGTM() {
  console.log('🏷️  Optimizing Google Tag Manager implementation...\n');
  
  try {
    const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
    let layoutContent = await fs.readFile(layoutPath, 'utf8');
    
    // Check if GTM script exists
    if (layoutContent.includes('googletagmanager.com/gtm.js')) {
      console.log('✅ GTM script found in layout');
      
      // Check if it's using the optimal strategy
      if (layoutContent.includes('strategy="afterInteractive"')) {
        console.log('✅ GTM is using afterInteractive strategy');
      } else {
        console.log('⚠️  Consider using strategy="afterInteractive" for GTM');
      }
      
      // Check if noscript fallback exists
      if (layoutContent.includes('noscript') && layoutContent.includes('ns.html')) {
        console.log('✅ GTM noscript fallback is implemented');
      } else {
        console.log('⚠️  Add noscript fallback for GTM');
      }
    } else {
      console.log('❌ GTM script not found in layout');
    }
    
    console.log('');
  } catch (error) {
    console.error('❌ Error optimizing GTM:', error.message);
  }
}

// Function to optimize Google Adsense implementation
async function optimizeAdsense() {
  console.log('💰 Optimizing Google AdSense implementation...\n');
  
  try {
    const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
    let layoutContent = await fs.readFile(layoutPath, 'utf8');
    
    // Check if Adsense script exists
    if (layoutContent.includes('pagead2.googlesyndication.com')) {
      console.log('✅ AdSense script found in layout');
      
      // Check if it's using async loading
      if (layoutContent.includes('async')) {
        console.log('✅ AdSense is using async loading');
      } else {
        console.log('⚠️  Add async attribute to AdSense script');
      }
      
      // Check if it's using lazy loading
      if (layoutContent.includes('strategy="lazyOnload"')) {
        console.log('✅ AdSense is using lazyOnload strategy');
      } else {
        console.log('💡 Consider using strategy="lazyOnload" for AdSense');
      }
      
      // Check if it's placed in the body (recommended)
      const bodySection = layoutContent.substring(
        layoutContent.indexOf('<body'),
        layoutContent.indexOf('</body>')
      );
      
      if (bodySection.includes('pagead2.googlesyndication.com')) {
        console.log('✅ AdSense script is placed in body section');
      } else {
        console.log('💡 Consider moving AdSense script to body section');
      }
    } else {
      console.log('❌ AdSense script not found in layout');
    }
    
    console.log('');
  } catch (error) {
    console.error('❌ Error optimizing AdSense:', error.message);
  }
}

// Function to optimize resource loading hints
async function optimizeResourceHints() {
  console.log('⚡ Optimizing resource loading hints...\n');
  
  try {
    const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
    let layoutContent = await fs.readFile(layoutPath, 'utf8');
    
    // Critical domains that should have preconnect
    const criticalDomains = [
      'https://res.cloudinary.com',
      'https://pagead2.googlesyndication.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    console.log('Checking preconnect hints:');
    criticalDomains.forEach(domain => {
      if (layoutContent.includes(`preconnect" href="${domain}`)) {
        console.log(`✅ ${domain} has preconnect hint`);
      } else {
        console.log(`⚠️  Add preconnect hint for ${domain}`);
      }
    });
    
    // Check for preload hints on critical resources
    console.log('\nChecking preload hints:');
    const preloadResources = [
      'Hero image',
      'Critical fonts',
      'Above-the-fold images'
    ];
    
    preloadResources.forEach(resource => {
      console.log(`💡 Consider preloading critical ${resource}`);
    });
    
    console.log('');
  } catch (error) {
    console.error('❌ Error optimizing resource hints:', error.message);
  }
}

// Function to optimize ad placement and prevent CLS
async function optimizeAdPlacement() {
  console.log('📢 Optimizing ad placement to prevent CLS...\n');
  
  try {
    // Check for ad components
    const componentDirs = [
      path.join(__dirname, '..', 'src', 'components')
    ];
    
    let adComponents = [];
    
    for (const dir of componentDirs) {
      try {
        const files = await fs.readdir(dir);
        const tsxFiles = files.filter(file => file.endsWith('.tsx'));
        
        for (const file of tsxFiles) {
          const filePath = path.join(dir, file);
          const content = await fs.readFile(filePath, 'utf8');
          
          if (content.includes('Advertisement') || 
              content.includes('AdSense') || 
              content.includes('ad placeholder') ||
              content.includes('ad-space')) {
            adComponents.push({
              file: path.relative(path.join(__dirname, '..'), filePath),
              hasReservedSpace: content.includes('minHeight') || content.includes('height:')
            });
          }
        }
      } catch (error) {
        // Continue if directory doesn't exist
      }
    }
    
    if (adComponents.length > 0) {
      console.log('Found ad components:');
      adComponents.forEach(component => {
        console.log(`  • ${component.file} ${component.hasReservedSpace ? '✅' : '⚠️ (needs reserved space)'}`);
      });
      
      if (adComponents.some(c => !c.hasReservedSpace)) {
        console.log('\n💡 Recommendation: Reserve space for all ad containers to prevent CLS');
        console.log('   Add style={{ minHeight: \'250px\' }} to ad containers');
      }
    } else {
      console.log('No ad components found');
    }
    
    console.log('');
  } catch (error) {
    console.error('❌ Error optimizing ad placement:', error.message);
  }
}

// Function to provide third-party optimization recommendations
async function provideRecommendations() {
  console.log('💡 Third-Party Optimization Recommendations:\n');
  
  const recommendations = [
    {
      category: 'Loading Strategy',
      tips: [
        'Use strategy="lazyOnload" for non-critical third-party scripts',
        'Place third-party scripts at the end of the body',
        'Defer non-essential scripts until after main content loads',
        'Use async or defer attributes for external scripts'
      ]
    },
    {
      category: 'Resource Hints',
      tips: [
        'Add preconnect hints for critical third-party domains',
        'Use dns-prefetch for domains not eligible for preconnect',
        'Preload critical third-party resources',
        'Prioritize resource hints for above-the-fold content'
      ]
    },
    {
      category: 'Performance Impact',
      tips: [
        'Monitor Core Web Vitals after third-party changes',
        'Use requestIdleCallback for non-essential third-party code',
        'Implement timeout mechanisms for third-party scripts',
        'Consider self-hosting critical third-party resources'
      ]
    },
    {
      category: 'Ad Optimization',
      tips: [
        'Reserve space for all ad containers to prevent CLS',
        'Use sticky ads for better user experience',
        'Implement ad collapse detection',
        'Consider ad density and placement for mobile'
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

// Function to generate optimized third-party script implementation
async function generateOptimizedScripts() {
  console.log('🔧 Generating optimized third-party script templates...\n');
  
  const optimizedGTM = `
<!-- Optimized Google Tag Manager -->
<script>
(function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),
      dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M5STLSHD');
</script>
<!-- End Google Tag Manager -->
  `;
  
  const optimizedAdsense = `
<!-- Optimized Google AdSense -->
<script async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXX"
        crossorigin="anonymous"
        strategy="lazyOnload">
</script>
<!-- End Google AdSense -->
  `;
  
  const resourceHints = `
<!-- Optimized Resource Hints -->
<link rel="preconnect" href="https://res.cloudinary.com" crossorigin>
<link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin>
<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
<link rel="preconnect" href="https://www.google-analytics.com" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://googleads.g.doubleclick.net">
<!-- End Resource Hints -->
  `;
  
  console.log('📋 Optimized GTM Implementation:');
  console.log(optimizedGTM.trim());
  
  console.log('\n📋 Optimized AdSense Implementation:');
  console.log(optimizedAdsense.trim());
  
  console.log('\n📋 Resource Hints:');
  console.log(resourceHints.trim());
  
  console.log('\n💡 To implement these optimizations:');
  console.log('  1. Update your layout.tsx with the optimized scripts');
  console.log('  2. Ensure proper placement of scripts');
  console.log('  3. Add resource hints to head section');
  console.log('  4. Test performance after implementation\n');
}

// Main optimization function
async function optimizeThirdParty() {
  console.log('🚀 Starting third-party script optimization for Marwari Luxe...\n');
  
  try {
    await optimizeGTM();
    await optimizeAdsense();
    await optimizeResourceHints();
    await optimizeAdPlacement();
    await provideRecommendations();
    await generateOptimizedScripts();
    
    console.log('✅ Third-party optimization analysis complete!');
    console.log('\n📋 Next steps:');
    console.log('  1. Implement the recommended optimizations');
    console.log('  2. Test Core Web Vitals after changes');
    console.log('  3. Monitor performance in real-world conditions');
    console.log('  4. Re-run this script to verify improvements');
  } catch (error) {
    console.error('❌ Third-party optimization failed:', error);
    process.exit(1);
  }
}

// Run optimization if script is called directly
if (require.main === module) {
  optimizeThirdParty();
}

module.exports = {
  optimizeThirdParty,
  optimizeGTM,
  optimizeAdsense,
  optimizeResourceHints,
  optimizeAdPlacement,
  provideRecommendations,
  generateOptimizedScripts
};