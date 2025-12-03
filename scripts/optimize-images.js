#!/usr/bin/env node

// Image optimization script for Marwari Luxe
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

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

// Function to optimize a single image
async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);
    
    // Skip already optimized files (those with .optimized extension)
    if (fileName.includes('.optimized')) {
      console.log(`Skipping already optimized file: ${filePath}`);
      return;
    }
    
    // Get file stats
    const stats = await fs.stat(filePath);
    const originalSize = stats.size;
    
    // Define optimization settings based on file type
    let pipeline = sharp(filePath);
    
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        pipeline = pipeline.jpeg({ 
          quality: 80, 
          progressive: true,
          mozjpeg: true
        });
        break;
      case '.png':
        pipeline = pipeline.png({ 
          quality: 80,
          compressionLevel: 9,
          adaptiveFiltering: true
        });
        break;
      case '.webp':
        pipeline = pipeline.webp({ 
          quality: 80,
          lossless: false
        });
        break;
      case '.avif':
        pipeline = pipeline.avif({ 
          quality: 80,
          lossless: false
        });
        break;
      default:
        console.log(`Unsupported format for optimization: ${filePath}`);
        return;
    }
    
    // Process the image
    const optimizedBuffer = await pipeline.toBuffer();
    const optimizedSize = optimizedBuffer.length;
    
    // Only save if the optimized version is smaller
    if (optimizedSize < originalSize) {
      // Create backup of original file
      const backupPath = filePath.replace(ext, `.backup${ext}`);
      await fs.copyFile(filePath, backupPath);
      
      // Save optimized version
      await fs.writeFile(filePath, optimizedBuffer);
      
      const savedPercent = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
      console.log(`✅ Optimized: ${fileName} (${(originalSize / 1024).toFixed(2)}KB → ${(optimizedSize / 1024).toFixed(2)}KB, saved ${savedPercent}%)`);
    } else {
      console.log(`➖ No improvement: ${fileName} (original: ${(originalSize / 1024).toFixed(2)}KB, optimized: ${(optimizedSize / 1024).toFixed(2)}KB)`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
  }
}

// Main optimization function
async function optimizeImages() {
  console.log('Starting image optimization...');
  
  try {
    // Get all image files in public directory
    const imageFiles = await getAllImageFiles(path.join(__dirname, '..', 'public'));
    console.log(`Found ${imageFiles.length} image files to optimize`);
    
    // Optimize each image
    for (const filePath of imageFiles) {
      await optimizeImage(filePath);
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Image optimization failed:', error);
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
  getAllImageFiles
};