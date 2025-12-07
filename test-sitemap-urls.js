const fs = require('fs');
const path = require('path');

// Read the sitemap file
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// Extract URLs from sitemap
const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
const urls = urlMatches.map(match => match.replace('<loc>', '').replace('</loc>', ''));

console.log(`Found ${urls.length} URLs in sitemap`);

// Check for duplicates
const uniqueUrls = [...new Set(urls)];
if (uniqueUrls.length !== urls.length) {
  console.log(`⚠️  Warning: Found ${urls.length - uniqueUrls.length} duplicate URLs`);
} else {
  console.log('✅ No duplicate URLs found');
}

// Show sample of URLs
console.log('\nSample URLs:');
urls.slice(0, 10).forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});

if (urls.length > 10) {
  console.log(`... and ${urls.length - 10} more URLs`);
}

// Instructions for testing HTTP 200 responses
console.log('\n📋 To test HTTP 200 responses for all URLs:');
console.log('1. Install axios: npm install axios');
console.log('2. Uncomment the code below and run this script');
console.log('3. The script will check each URL and report any that do not return 200');

/*
// Uncomment this section to test HTTP responses
const axios = require('axios');

async function testUrls() {
  console.log('\nTesting URLs for HTTP 200 responses...');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const url of urls) {
    try {
      const response = await axios.get(url, { timeout: 10000 });
      if (response.status === 200) {
        successCount++;
        console.log(`✅ ${url}`);
      } else {
        errorCount++;
        console.log(`❌ ${url} - Status: ${response.status}`);
      }
    } catch (error) {
      errorCount++;
      console.log(`❌ ${url} - Error: ${error.message}`);
    }
  }
  
  console.log(`\n📊 Results: ${successCount} successful, ${errorCount} errors`);
}

testUrls();
*/