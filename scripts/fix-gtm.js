#!/usr/bin/env node

// Script to fix Google Tag Manager verification issues
const fs = require('fs').promises;
const path = require('path');

async function fixGTMImplementation() {
  console.log('Fixing Google Tag Manager implementation...\n');
  
  try {
    // Read the layout file
    const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
    let layoutContent = await fs.readFile(layoutPath, 'utf8');
    
    // Check if we have both GTM and GA4 - this can cause conflicts
    const hasGTM = layoutContent.includes('GTM-M5STLSHD');
    const hasGA4 = layoutContent.includes('G-SP1G773WJ6');
    
    if (hasGTM && hasGA4) {
      console.log('⚠️  Both GTM and GA4 detected. This may cause conflicts.');
      console.log('💡 Recommendation: Use GTM to manage all Google tags instead of having separate GA4 implementation.\n');
    }
    
    // Check if GTM script is in the correct location (head section)
    const headSection = layoutContent.substring(
      layoutContent.indexOf('<head>'),
      layoutContent.indexOf('</head>')
    );
    
    const hasGTMScriptInHead = headSection.includes('googletagmanager.com/gtm.js');
    if (!hasGTMScriptInHead) {
      console.log('❌ GTM script not found in head section');
      // We won't automatically fix this as it requires careful placement
    } else {
      console.log('✅ GTM script is in head section');
    }
    
    // Check if noscript tag is directly after opening body tag
    const bodySectionStart = layoutContent.indexOf('<body');
    const bodyTagEnd = layoutContent.indexOf('>', bodySectionStart) + 1;
    const afterBodyTag = layoutContent.substring(bodyTagEnd, bodyTagEnd + 200); // Check first 200 chars
    
    const hasNoscriptAfterBody = afterBodyTag.includes('<noscript>') && 
                                afterBodyTag.includes('ns.html?id=GTM-M5STLSHD');
    if (!hasNoscriptAfterBody) {
      console.log('⚠️  GTM noscript tag may not be properly positioned');
    } else {
      console.log('✅ GTM noscript tag is properly positioned');
    }
    
    // Check for common GTM verification issues
    console.log('\n🔍 Checking for common GTM verification issues...\n');
    
    // 1. Check if GTM container is published
    console.log('1. Ensure your GTM container is published in Google Tag Manager');
    
    // 2. Check domain permissions
    console.log('2. Verify that your domain is whitelisted in GTM container settings');
    
    // 3. Check for ad blockers
    console.log('3. Test verification without ad blockers enabled');
    
    // 4. Check if there are multiple GTM containers
    const gtmMatches = layoutContent.match(/GTM-[A-Z0-9]+/g) || [];
    const uniqueGTMContainers = [...new Set(gtmMatches)];
    if (uniqueGTMContainers.length > 1) {
      console.log(`⚠️  Multiple GTM containers detected: ${uniqueGTMContainers.join(', ')}`);
      console.log('   This can cause verification issues. Use only one container.');
    }
    
    // 5. Check if there are conflicting analytics implementations
    if (hasGA4) {
      console.log('⚠️  Separate GA4 implementation detected (G-SP1G773WJ6)');
      console.log('   Consider removing separate GA4 and managing it through GTM instead');
    }
    
    // Recommendations
    console.log('\n🔧 Recommended fixes:\n');
    console.log('1. Log into Google Tag Manager');
    console.log('2. Verify container GTM-M5STLSHD is published');
    console.log('3. Check container settings > Container Permissions > Domain Restrictions');
    console.log('4. Ensure your domain is listed or set to "Allow all domains"');
    console.log('5. Test verification in incognito/private browsing mode');
    console.log('6. If issues persist, consider removing the separate GA4 implementation');
    
    // Create a verification guide
    console.log('\n📋 Verification checklist:');
    console.log('☐ GTM container is published');
    console.log('☐ Domain is whitelisted in container settings');
    console.log('☐ No ad blockers are active during verification');
    console.log('☐ Using only one GTM container');
    console.log('☐ Testing in clean browser environment');
    console.log('☐ GA4 managed through GTM (not separately implemented)');
    
  } catch (error) {
    console.error('Error fixing GTM implementation:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  fixGTMImplementation();
}

module.exports = {
  fixGTMImplementation
};