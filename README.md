This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Performance Optimizations

This project includes several performance optimizations to ensure fast loading times (2-3 seconds target):

### Code Splitting & Lazy Loading
- Dynamic imports for all components
- Loading skeletons for better perceived performance
- Optimized data loading with lightweight indexes

### Image Optimization
- Next.js Image component with automatic optimization
- Cloudinary integration for responsive images
- Proper sizing and quality settings

### Caching Strategies
- HTTP headers for static asset caching
- Service worker support (planned)
- Efficient resource loading

### Bundle Optimization
- SWC minification
- Preact replacement in production
- Modularized imports

### Resource Hints
- Preconnect to critical third-party domains
- Prefetch for key navigation paths
- Preload for critical resources

## Performance Monitoring

### Development Tools
- PerformanceMonitor component (Ctrl+Shift+P to toggle)
- Web Vitals tracking
- Bundle analysis with `npm run analyze`

### Production Monitoring
- Google Analytics 4 integration
- Core Web Vitals tracking
- Error tracking with Sentry (planned)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Environment Variables

Before deploying, make sure to set the following environment variables in your Vercel project settings:

```
NEXT_PUBLIC_APP_URL=https://your-domain.com
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
WISE_API_TOKEN=your_wise_api_token
WISE_PROFILE_ID=your_wise_profile_id
NEXT_PUBLIC_WISE_ENVIRONMENT=production
NEXT_PUBLIC_PAYPAL_ENVIRONMENT=production
```

### Deployment Steps

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Add the required environment variables in the Vercel project settings
4. Deploy your project

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sitemap

This project includes a sitemap.xml file in the public directory for search engine optimization. The sitemap is automatically served at `/sitemap.xml` and includes all important pages of the website.

### Google Search Console Integration

To resolve the "Sitemap could not be read" error:

1. Visit the sitemap directly: https://marwariluxe.com/sitemap.xml
2. Manually submit the sitemap in Google Search Console:
   - Go to Google Search Console
   - Select your property
   - Click "Sitemaps" in the left sidebar
   - Enter "sitemap.xml" and click "Submit"

For detailed troubleshooting, see [README.SITEMAP.md](README.SITEMAP.md).