# Sitemap Setup and Troubleshooting Guide

## Current Status
The sitemap.xml file is properly configured and located in the public directory. It should be automatically served at `https://marwariluxe.com/sitemap.xml`.

## Google Search Console Sitemap Submission

Since Google has deprecated the automatic ping service, you need to manually submit your sitemap to Google Search Console:

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Select your property (https://marwariluxe.com)
3. In the left sidebar, click on "Sitemaps"
4. In the "Add a sitemap" field, enter: `sitemap.xml`
5. Click "Submit"

## Troubleshooting "Sitemap could not be read" Error

If Google Search Console still shows "Sitemap could not be read", try these solutions:

### 1. Verify Sitemap Accessibility
First, check if your sitemap is publicly accessible:
- Visit: https://marwariluxe.com/sitemap.xml
- You should see the XML content of your sitemap

### 2. Check Sitemap Validity
Use an online sitemap validator:
- Visit: https://www.xml-sitemaps.com/validate-xml.html
- Enter your sitemap URL: https://marwariluxe.com/sitemap.xml
- Click "Validate Now"

### 3. Common Issues and Fixes

#### Issue: Incorrect Content-Type Header
**Fix**: Already addressed in vercel.json with:
```json
{
  "source": "/sitemap.xml",
  "headers": [
    {
      "key": "Content-Type",
      "value": "application/xml"
    }
  ]
}
```

#### Issue: Sitemap Not Found (404)
**Fix**: Ensure the sitemap.xml file is in the public directory

#### Issue: Server Errors (5xx)
**Fix**: Check Vercel deployment logs for any errors

### 4. Sitemap Best Practices Implemented

1. **Proper XML Format**: 
   - Correct XML declaration
   - Proper namespace declaration
   - Well-formed XML structure

2. **Valid URLs**: 
   - All URLs use HTTPS
   - All URLs are complete (absolute paths)

3. **Updated Dates**: 
   - Last modification dates are current
   - Format follows YYYY-MM-DD standard

4. **Correct Priorities**: 
   - Priority values between 0.0 and 1.0
   - Homepage has highest priority (1.0)

5. **Appropriate Change Frequencies**:
   - Values match actual content update frequency

## Automated Sitemap Submission

Since Google no longer accepts automatic pings, the recommended approach is to:

1. Ensure your sitemap is valid and accessible
2. Submit it manually once through Google Search Console
3. Google will automatically check for updates periodically

## For Future Updates

When you update your website content, remember to:
1. Update the lastmod dates in sitemap.xml
2. Re-submit the sitemap to Google Search Console if you want immediate indexing
3. Or wait for Google's automatic crawler to detect changes

## Contact for Further Assistance

If you continue to experience issues:
1. Check the browser console for any errors when accessing the sitemap directly
2. Verify the Vercel deployment was successful
3. Contact Google Search Console support with specific error details