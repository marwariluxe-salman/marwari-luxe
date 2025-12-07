const fs = require('fs');
const path = require('path');

// Read the sitemap file
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// Count the number of <url> tags
const urlCount = (sitemapContent.match(/<url>/g) || []).length;
console.log(`Number of URLs in sitemap: ${urlCount}`);