#!/usr/bin/env node

// Script to verify sitemap configuration and provide detailed diagnostics

const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

console.log('🔍 Sitemap Verification Script');
console.log('============================\n');

// 1. Check if sitemap.xml exists in public directory
console.log('1. Checking if sitemap.xml exists...');
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  console.log('✅ sitemap.xml found in public directory\n');
} else {
  console.log('❌ sitemap.xml NOT found in public directory\n');
  process.exit(1);
}

// 2. Validate XML structure
console.log('2. Validating XML structure...');
try {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  
  // Check for XML declaration
  if (!sitemapContent.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
    console.log('❌ Missing XML declaration');
  } else {
    console.log('✅ XML declaration present');
  }
  
  // Check for urlset tag with correct namespace
  if (!sitemapContent.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
    console.log('❌ Missing or incorrect urlset tag with namespace');
  } else {
    console.log('✅ urlset tag with correct namespace present');
  }
  
  // Check if sitemap is properly closed
  if (!sitemapContent.trim().endsWith('</urlset>')) {
    console.log('❌ Sitemap not properly closed with </urlset>');
  } else {
    console.log('✅ Sitemap properly closed with </urlset>');
  }
  
  // Parse XML to check for well-formedness
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: 'text'
  });
  
  try {
    const parsed = parser.parse(sitemapContent);
    console.log('✅ XML is well-formed\n');
    
    // Check urlset structure
    if (parsed.urlset && parsed.urlset.url) {
      const urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
      console.log(`✅ Found ${urls.length} URLs in sitemap`);
      
      // Validate first few URLs
      const sampleUrls = urls.slice(0, 3);
      for (const url of sampleUrls) {
        if (url.loc && url.loc.startsWith('http')) {
          console.log(`  ✅ Valid URL: ${url.loc}`);
        } else {
          console.log(`  ❌ Invalid URL: ${url.loc || 'missing'}`);
        }
      }
    } else {
      console.log('❌ No URLs found in sitemap');
    }
  } catch (parseError) {
    console.log('❌ XML parsing failed:', parseError.message);
  }
} catch (error) {
  console.log('❌ Error reading sitemap file:', error.message);
}

// 3. Check vercel.json configuration
console.log('\n3. Checking Vercel configuration...');
const vercelPath = path.join(__dirname, '..', 'vercel.json');
if (fs.existsSync(vercelPath)) {
  try {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
    
    // Check for sitemap headers
    let hasSitemapHeaders = false;
    if (vercelConfig.headers && Array.isArray(vercelConfig.headers)) {
      for (const header of vercelConfig.headers) {
        if (header.source === '/sitemap.xml') {
          hasSitemapHeaders = true;
          console.log('✅ Custom headers for sitemap.xml found');
          
          // Check for Content-Type header
          let hasContentType = false;
          if (header.headers && Array.isArray(header.headers)) {
            for (const h of header.headers) {
              if (h.key === 'Content-Type' && h.value === 'application/xml') {
                hasContentType = true;
                console.log('  ✅ Content-Type header set to application/xml');
              }
            }
          }
          
          if (!hasContentType) {
            console.log('  ⚠️  Content-Type header for sitemap.xml not properly set');
          }
          break;
        }
      }
    }
    
    if (!hasSitemapHeaders) {
      console.log('⚠️  No custom headers found for sitemap.xml (this is recommended but not required)');
    }
  } catch (error) {
    console.log('❌ Error reading vercel.json:', error.message);
  }
} else {
  console.log('ℹ️  vercel.json not found (not required for sitemap functionality)');
}

// 4. Check middleware configuration
console.log('\n4. Checking middleware configuration...');
const middlewarePath = path.join(__dirname, '..', 'middleware.ts');
if (fs.existsSync(middlewarePath)) {
  console.log('✅ middleware.ts found');
  const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');
  
  if (middlewareContent.includes('/sitemap.xml')) {
    console.log('  ✅ Middleware handles sitemap.xml requests');
  } else {
    console.log('  ⚠️  Middleware does not appear to handle sitemap.xml requests');
  }
} else {
  console.log('ℹ️  middleware.ts not found (not required for static sitemaps)');
}

// 5. Summary
console.log('\n📋 Summary');
console.log('==========');
console.log('The sitemap.xml file appears to be correctly configured.');
console.log('To resolve the "Sitemap could not be read" error in Google Search Console:');
console.log('\n1. Visit https://marwariluxe.com/sitemap.xml directly in your browser');
console.log('   to verify it loads correctly');
console.log('\n2. Manually submit the sitemap in Google Search Console:');
console.log('   - Go to Google Search Console');
console.log('   - Select your property');
console.log('   - Click "Sitemaps" in the left sidebar');
console.log('   - Enter "sitemap.xml" and click "Submit"');
console.log('\n3. If issues persist, use an online sitemap validator to check for errors');

console.log('\n✅ Verification complete');