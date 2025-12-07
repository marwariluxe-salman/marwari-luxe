#!/usr/bin/env node

// Enhanced Image Optimization Script for Marwari Luxe
// Focuses on LCP improvement and aggressive compression for mobile performance

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Enhanced optimization settings for better LCP and mobile performance
const OPTIMIZATION_SETTINGS = {
  // Aggressive compression for web delivery
  jpeg: { 
    quality: 75,         // Reduced from 80 for smaller file size
    progressive: true,
    mozjpeg: true,
    chromaSubsampling: '4:2:0'  // Better compression for photos
  },
  png: { 
    quality: 75,         // Reduced from 80
    compressionLevel: 9, // Maximum compression
    adaptiveFiltering: true,
    palette: true        // Reduce colors for smaller PNGs
  },
  webp: { 
    quality: 70,         // Reduced from 80 for better file size
    lossless: false,
    nearLossless: true,
    qualityAlpha: 70
  },
  avif: { 
    quality: 65,         // Reduced from 80 for smallest file size
    lossless: false,
    speed: 6             // Balance between speed and quality
  }
};

// Function to get all image files recursively
async function getAllImageFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      results = [...results, ...(await getAllImageFiles(filePath))];
    } else if (
      file.endsWith('.jpg') || 
      file.endsWith('.jpeg') || 
      file.endsWith('.png') || 
      file.endsWith('.webp') || 
      file.endsWith('.avif') ||
      file.endsWith('.gif')
    ) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Function to optimize a single image with enhanced settings
async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);
    const dirName = path.dirname(filePath);
    
    // Skip already optimized files
    if (fileName.includes('.optimized') || fileName.includes('.backup')) {
      console.log(`⏭️  Skipping processed file: ${filePath}`);
      return;
    }
    
    // Get file stats
    const stats = await fs.stat(filePath);
    const originalSize = stats.size;
    
    // Skip very small files (< 5KB) as optimization won't help much
    if (originalSize < 5 * 1024) {
      console.log(`⏭️  Skipping small file: ${fileName} (${(originalSize / 1024).toFixed(2)}KB)`);
      return;
    }
    
    // Define optimization pipeline based on file type
    let pipeline = sharp(filePath);
    
    // Extract image metadata to make intelligent optimizations
    const metadata = await pipeline.metadata();
    
    // Apply format-specific optimizations
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        pipeline = pipeline.jpeg(OPTIMIZATION_SETTINGS.jpeg);
        break;
      case '.png':
        // For PNGs, check if we can convert to JPEG for better compression
        if (metadata.hasAlpha) {
          pipeline = pipeline.png(OPTIMIZATION_SETTINGS.png);
        } else {
          // Convert to JPEG for better compression if no transparency needed
          console.log(`🔄 Converting PNG to JPEG for better compression: ${fileName}`);
          pipeline = pipeline.jpeg(OPTIMIZATION_SETTINGS.jpeg);
          // Change extension for output
          filePath = path.join(dirName, fileName.replace(ext, '.jpg'));
        }
        break;
      case '.webp':
        pipeline = pipeline.webp(OPTIMIZATION_SETTINGS.webp);
        break;
      case '.avif':
        pipeline = pipeline.avif(OPTIMIZATION_SETTINGS.avif);
        break;
      case '.gif':
        // For GIFs, convert to WebP for better compression and quality
        console.log(`🔄 Converting GIF to WebP for better performance: ${fileName}`);
        pipeline = pipeline.webp(OPTIMIZATION_SETTINGS.webp);
        filePath = path.join(dirName, fileName.replace(ext, '.webp'));
        break;
      default:
        console.log(`⚠️  Unsupported format for optimization: ${filePath}`);
        return;
    }
    
    // Resize large images that are bigger than necessary for web
    if (metadata.width > 1920 || metadata.height > 1920) {
      console.log(`📏 Resizing large image: ${fileName} (${metadata.width}x${metadata.height})`);
      pipeline = pipeline.resize(1920, 1920, { 
        fit: 'inside', 
        withoutEnlargement: true 
      });
    }
    
    // Process the image
    const optimizedBuffer = await pipeline.toBuffer();
    const optimizedSize = optimizedBuffer.length;
    
    // Calculate savings
    const savedBytes = originalSize - optimizedSize;
    const savedPercent = ((savedBytes) / originalSize * 100);
    
    // Only save if we save at least 10% or 10KB
    if (savedPercent > 10 || savedBytes > 10 * 1024) {
      // Create backup of original file
      const backupPath = filePath.replace(ext, `.backup${ext}`);
      await fs.copyFile(filePath, backupPath);
      
      // Save optimized version
      await fs.writeFile(filePath, optimizedBuffer);
      
      console.log(`✅ Optimized: ${fileName} (${(originalSize / 1024).toFixed(2)}KB → ${(optimizedSize / 1024).toFixed(2)}KB, saved ${savedPercent.toFixed(2)}%)`);
    } else {
      console.log(`➖ Minimal improvement: ${fileName} (${(originalSize / 1024).toFixed(2)}KB → ${(optimizedSize / 1024).toFixed(2)}KB, saved ${savedPercent.toFixed(2)}%)`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
  }
}

// Function to optimize Cloudinary URLs in the codebase
async function optimizeCloudinaryUrls() {
  console.log('🌐 Optimizing Cloudinary URLs for better performance...');
  
  // Common Cloudinary optimization parameters
  const cloudinaryOptimizations = {
    fetchFormat: 'auto',    // Automatically choose the best format
    quality: 'auto:good',   // Good quality with reasonable file size
    dpr: 'auto',           // Automatically adjust for device pixel ratio
    crop: 'fill',          // Fill crop for consistent sizing
    gravity: 'auto',       // Auto gravity for better composition
    width: 'auto',         // Auto width based on container
  };
  
  // Create the optimization string
  const optimizationParams = Object.entries(cloudinaryOptimizations)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');
  
  // Files to check for Cloudinary URLs
  const filesToCheck = [
    path.join(__dirname, '..', 'src', 'components', 'HeroSlider.tsx'),
    path.join(__dirname, '..', 'src', 'components', 'IntroSection.tsx'),
    path.join(__dirname, '..', 'src', 'components', 'BlogSection.tsx'),
    path.join(__dirname, '..', 'src', 'app', 'layout.tsx')
  ];
  
  for (const filePath of filesToCheck) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      let updatedContent = content;
      let changesMade = false;
      
      // Regex to find Cloudinary URLs
      const cloudinaryUrlRegex = /(https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/)([^\/]+\/)?(v\d+\/[^'"\s]+)/g;
      
      let match;
      while ((match = cloudinaryUrlRegex.exec(content)) !== null) {
        const fullUrl = match[0];
        const baseUrl = match[1];
        const existingTransformations = match[2] || '';
        const imagePath = match[3];
        
        // Skip if already optimized
        if (existingTransformations.includes('f_auto') && existingTransformations.includes('q_auto')) {
          continue;
        }
        
        // Add our optimizations
        const optimizedUrl = `${baseUrl}${optimizationParams}/${imagePath}`;
        updatedContent = updatedContent.replace(fullUrl, optimizedUrl);
        changesMade = true;
        console.log(`🔧 Optimized Cloudinary URL in ${path.relative(__dirname, filePath)}:`);
        console.log(`   ${fullUrl} → ${optimizedUrl}`);
      }
      
      if (changesMade) {
        await fs.writeFile(filePath, updatedContent, 'utf8');
        console.log(`💾 Updated ${path.relative(__dirname, filePath)} with optimized Cloudinary URLs`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }
}

// Main optimization function
async function optimizeImages() {
  console.log('🚀 Starting enhanced image optimization for LCP and mobile performance...\n');
  
  try {
    // Optimize Cloudinary URLs first
    await optimizeCloudinaryUrls();
    
    // Get all image files in public directory
    const imageFiles = await getAllImageFiles(path.join(__dirname, '..', 'public'));
    console.log(`📁 Found ${imageFiles.length} image files to optimize\n`);
    
    // Optimize each image
    for (const filePath of imageFiles) {
      await optimizeImage(filePath);
    }
    
    console.log('\n✅ Enhanced image optimization complete!');
    console.log('💡 Tips for better LCP:');
    console.log('   • Use priority prop on above-the-fold Next.js Images');
    console.log('   • Add fetchPriority="high" to critical images');
    console.log('   • Preload hero images in document head');
    console.log('   • Set explicit width/height on all images');
    console.log('   • Use sizes prop for responsive images');
  } catch (error) {
    console.error('❌ Enhanced image optimization failed:', error);
    process.exit(1);
  }
}

// Run optimization if script is called directly
if (require.main === module) {
  optimizeImages();
}

module.exports = {
  optimizeImages,
  optimizeImage,
  getAllImageFiles,
  optimizeCloudinaryUrls
};