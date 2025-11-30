/**
 * Meta Description Verification Script
 * 
 * This script verifies that all pages have proper meta description implementation
 * and checks for common SEO issues related to meta descriptions.
 */

// Function to check meta description on current page
function checkMetaDescription() {
  // Get all meta description tags
  const metaDescriptions = document.querySelectorAll('meta[name="description"]');
  
  // Check if there's exactly one meta description
  if (metaDescriptions.length === 0) {
    console.warn('❌ No meta description found on this page');
    return {
      status: 'error',
      message: 'No meta description found',
      count: 0
    };
  }
  
  if (metaDescriptions.length > 1) {
    console.warn(`❌ Multiple meta descriptions found (${metaDescriptions.length})`);
    metaDescriptions.forEach((meta, index) => {
      console.warn(`  Meta ${index + 1}:`, meta.getAttribute('content'));
    });
    return {
      status: 'error',
      message: `Multiple meta descriptions found (${metaDescriptions.length})`,
      count: metaDescriptions.length
    };
  }
  
  // Check if meta description is in head
  const metaDesc = metaDescriptions[0];
  const isInHead = metaDesc.closest('head') !== null;
  
  if (!isInHead) {
    console.warn('❌ Meta description found outside <head> element');
    return {
      status: 'error',
      message: 'Meta description found outside <head> element',
      location: 'body'
    };
  }
  
  // Check meta description content
  const content = metaDesc.getAttribute('content');
  
  if (!content || content.trim() === '') {
    console.warn('❌ Meta description is empty');
    return {
      status: 'error',
      message: 'Meta description is empty',
      content: content
    };
  }
  
  if (content.length < 50) {
    console.warn('⚠️ Meta description is too short (< 50 characters)');
  }
  
  if (content.length > 160) {
    console.warn('⚠️ Meta description is too long (> 160 characters)');
  }
  
  // Check for duplicate content (basic check)
  const pageText = document.body.innerText.toLowerCase();
  const descText = content.toLowerCase();
  
  if (pageText.includes(descText)) {
    console.info('ℹ️ Meta description content also appears in page body');
  }
  
  console.log('✅ Meta description check passed');
  console.log('Content:', content);
  console.log('Length:', content.length);
  
  return {
    status: 'success',
    message: 'Meta description is properly implemented',
    content: content,
    length: content.length,
    count: 1
  };
}

// Function to check for meta descriptions in body (which would be incorrect)
function checkMetaInBody() {
  const bodyMetas = document.body.querySelectorAll('meta[name="description"]');
  
  if (bodyMetas.length > 0) {
    console.warn('❌ Found meta description tags in body:', bodyMetas.length);
    return false;
  }
  
  return true;
}

// Function to run comprehensive meta description audit
function runMetaDescriptionAudit() {
  console.log('🔍 Running Meta Description Audit...');
  
  const results = {
    pageUrl: window.location.href,
    timestamp: new Date().toISOString(),
    metaDescriptionCheck: checkMetaDescription(),
    bodyMetaCheck: checkMetaInBody()
  };
  
  console.log('📋 Audit Complete');
  return results;
}

// Run audit immediately
document.addEventListener('DOMContentLoaded', function() {
  // Run after a short delay to ensure all content is loaded
  setTimeout(() => {
    window.metaDescriptionAuditResults = runMetaDescriptionAudit();
  }, 1000);
});

// Also expose function globally for manual testing
window.checkMetaDescription = checkMetaDescription;
window.runMetaDescriptionAudit = runMetaDescriptionAudit;

console.log('🎯 Meta Description Verification Script Loaded');
console.log('Run checkMetaDescription() to verify current page');
console.log('Run runMetaDescriptionAudit() for full audit');