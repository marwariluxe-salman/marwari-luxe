#!/usr/bin/env node

// Script to submit sitemap to Google Search Console
// This should be run after deployment

const https = require('https');

// Sitemap URL
const sitemapUrl = 'https://marwariluxe.com/sitemap.xml';

// Google Search Console ping URL
const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

console.log('Submitting sitemap to Google Search Console...');
console.log(`Sitemap URL: ${sitemapUrl}`);
console.log(`Ping URL: ${googlePingUrl}`);

// Submit to Google
https.get(googlePingUrl, (res) => {
  console.log(`Google Search Console response status: ${res.statusCode}`);
  if (res.statusCode === 200) {
    console.log('✅ Sitemap submitted successfully to Google Search Console');
  } else {
    console.log('❌ Failed to submit sitemap to Google Search Console');
  }
  
  // Collect response data
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response data:', data.substring(0, 200) + '...');
  });
}).on('error', (err) => {
  console.error('❌ Error submitting sitemap to Google Search Console:', err.message);
});

// Also submit to Bing Webmaster Tools
const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

console.log('\nSubmitting sitemap to Bing Webmaster Tools...');
console.log(`Bing Ping URL: ${bingPingUrl}`);

https.get(bingPingUrl, (res) => {
  console.log(`Bing Webmaster Tools response status: ${res.statusCode}`);
  if (res.statusCode === 200) {
    console.log('✅ Sitemap submitted successfully to Bing Webmaster Tools');
  } else {
    console.log('❌ Failed to submit sitemap to Bing Webmaster Tools');
  }
  
  // Collect response data
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response data:', data.substring(0, 200) + '...');
  });
}).on('error', (err) => {
  console.error('❌ Error submitting sitemap to Bing Webmaster Tools:', err.message);
});