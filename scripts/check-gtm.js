#!/usr/bin/env node

// Script to check Google Tag Manager implementation issues
const fs = require('fs').promises;
const path = require('path');

async function checkGTMImplementation() {
  console.log('Checking Google Tag Manager implementation...\n');
  
  try {
    // Read the layout file
    const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
    const layoutContent = await fs.readFile(layoutPath, 'utf8');
    
    // Check for GTM container ID
    const gtmIdMatch = layoutContent.match(/GTM-[A-Z0-9]+/);
    if (gtmIdMatch) {
      console.log(`✅ GTM Container ID found: ${gtmIdMatch[0]}`);
    } else {
      console.log('❌ No GTM Container ID found');
      return;
    }
    
    // Check for GTM script in head
    const hasGtmScript = layoutContent.includes('googletagmanager.com/gtm.js');
    if (hasGtmScript) {
      console.log('✅ GTM script found in head section');
    } else {
      console.log('❌ GTM script missing from head section');
    }
    
    // Check for noscript iframe
    const hasNoscript = layoutContent.includes('<noscript>') && layoutContent.includes('ns.html?id=');
    if (hasNoscript) {
      console.log('✅ GTM noscript fallback found');
    } else {
      console.log('❌ GTM noscript fallback missing');
    }
    
    // Check for proper placement (after opening body tag)
    const bodyIndex = layoutContent.indexOf('<body');
    const gtmScriptIndex = layoutContent.indexOf('googletagmanager.com/gtm.js');
    if (bodyIndex !== -1 && gtmScriptIndex !== -1 && gtmScriptIndex > bodyIndex) {
      console.log('✅ GTM script properly placed after body tag');
    } else {
      console.log('⚠️  Check GTM script placement');
    }
    
    // Check for duplicate GTM implementations
    const gtmScriptCount = (layoutContent.match(/googletagmanager.com/g) || []).length;
    if (gtmScriptCount > 2) { // 2 is normal (script + noscript)
      console.log('⚠️  Possible duplicate GTM implementations found');
    } else {
      console.log('✅ No duplicate GTM implementations found');
    }
    
    // Check robots.txt for GTM related blocks
    try {
      const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
      const robotsContent = await fs.readFile(robotsPath, 'utf8');
      
      if (robotsContent.includes('googletagmanager.com')) {
        console.log('⚠️  GTM domain blocked in robots.txt');
      } else {
        console.log('✅ GTM domain not blocked in robots.txt');
      }
    } catch (robotsError) {
      console.log('ℹ️  No robots.txt file found');
    }
    
    console.log('\n🔍 Recommendations:');
    console.log('1. Verify GTM container ID in Google Tag Manager');
    console.log('2. Check that the container is published');
    console.log('3. Verify domain permissions in GTM container settings');
    console.log('4. Check Google Search Console for verification errors');
    console.log('5. Ensure no ad blockers are interfering with GTM');
    
  } catch (error) {
    console.error('Error checking GTM implementation:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  checkGTMImplementation();
}

module.exports = {
  checkGTMImplementation
};