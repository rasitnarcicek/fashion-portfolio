# Deployment Guide

## Pre-Deployment Checklist

### 1. Build the Site
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### 2. Verify Build Output
```bash
ls -lh dist/
ls -lh dist/assets/
```

Expected output:
- Minified HTML (~11KB)
- Bundled CSS (~7.5KB)
- Bundled JS (~2KB)
- Favicon files
- Images directory

### 3. Test Production Build Locally
```bash
npm run preview
```

Visit http://localhost:4173 and verify:
- All pages load correctly
- Images display properly
- Navigation works on mobile and desktop
- No console errors

## Deployment Options

### Option 1: Netlify

1. Connect your Git repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 2: Vercel

1. Connect your Git repository
2. Vercel auto-detects Vite configuration
3. Deploy

Or use Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Add deploy script to package.json:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

### Option 4: CloudFlare Pages

1. Connect your Git repository
2. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
3. Deploy

### Option 5: AWS S3 + CloudFront

1. Build the site:
```bash
npm run build
```

2. Upload dist/ contents to S3 bucket
3. Configure CloudFront distribution
4. Set cache headers:
   - `/assets/*` - max-age=31536000
   - `/*.html` - no-cache

## Post-Deployment Tasks

### 1. Update Meta Tags

In `index.html`, update:
```html
<meta property="og:url" content="YOUR_ACTUAL_URL">
<meta property="og:image" content="YOUR_ACTUAL_URL/images/og-image.jpg">
<meta name="twitter:image" content="YOUR_ACTUAL_URL/images/og-image.jpg">
```

### 2. Configure Custom Domain (if applicable)

Follow your hosting provider's instructions for custom domains.

### 3. Enable HTTPS

Most modern hosting providers enable HTTPS by default. Verify:
- SSL certificate is active
- HTTP redirects to HTTPS
- No mixed content warnings

### 4. Set Up Redirects (if needed)

Create a `_redirects` file (Netlify) or configure in hosting dashboard.

### 5. Configure Caching Headers

Recommended cache settings:
```
# Static assets (CSS, JS with hashed filenames)
/assets/* 
  Cache-Control: public, max-age=31536000, immutable

# HTML files
/*.html
  Cache-Control: public, max-age=0, must-revalidate

# Images
/images/*
  Cache-Control: public, max-age=31536000

# Favicons
/*.png
  Cache-Control: public, max-age=31536000
```

## Performance Verification

### Run Lighthouse Audit

After deployment:

1. Open Chrome DevTools
2. Navigate to Lighthouse tab
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

Target scores: 90+ for all metrics

Or use CLI:
```bash
npm install -g lighthouse
lighthouse https://your-site.com --view
```

### Test Responsive Design

1. Use Chrome DevTools Device Mode
2. Test these viewports:
   - iPhone SE (375px)
   - iPhone 12/13 (390px)
   - Pixel 5 (393px)
   - iPad (768px)
   - iPad Pro (1024px)
   - Desktop (1440px+)

### Test on Real Devices

- iOS: iPhone with Safari
- Android: Phone with Chrome
- Tablet: iPad or Android tablet
- Desktop: Various browsers

### Verify Loading Performance

Use Chrome DevTools Network tab:
1. Set throttling to "Slow 3G"
2. Reload page
3. Verify:
   - Page loads in <5 seconds
   - Images lazy load correctly
   - No layout shift during load

## Monitoring

### Set Up Analytics (Optional)

Choose one:
- Google Analytics 4
- Plausible Analytics
- Fathom Analytics
- Simple Analytics

### Monitor Core Web Vitals

Key metrics to track:
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1

Use Google Search Console or web-vitals library.

### Error Monitoring (Optional)

Consider services like:
- Sentry
- Rollbar
- LogRocket

## Continuous Integration/Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Troubleshooting

### Images Not Loading

- Verify images exist in `dist/images/`
- Check browser console for 404 errors
- Verify image paths are absolute (start with `/`)

### Styles Not Applied

- Clear browser cache
- Verify CSS file exists in `dist/assets/`
- Check for CORS issues

### JavaScript Not Working

- Check browser console for errors
- Verify JS file loaded correctly
- Test in incognito/private mode

### Mobile Menu Not Working

- Verify JavaScript loaded
- Check for touch event issues on actual devices
- Test in Chrome mobile emulator

### Poor Performance Scores

- Optimize images (reduce file sizes)
- Enable compression (Gzip/Brotli)
- Verify CDN/hosting is fast
- Check for render-blocking resources

## Maintenance

### Regular Updates

Monthly:
- Run Lighthouse audit
- Check for broken images/links
- Update dependencies: `npm update`
- Review analytics

Quarterly:
- Update Node.js version
- Update Vite version
- Review and optimize new content
- Test on latest browser versions

### Content Updates

When adding new content:
1. Optimize images before adding
2. Use same `<picture>` format
3. Add `loading="lazy"` to below-fold images
4. Test on mobile devices
5. Rebuild and deploy

## Security

### Update Dependencies

Regular updates:
```bash
npm audit
npm update
```

### Security Headers

Configure on hosting provider:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### HTTPS

- Always use HTTPS in production
- Set up HSTS header
- Redirect HTTP to HTTPS

## Support

For issues or questions:
1. Check documentation (README.md, PERFORMANCE.md)
2. Review browser console errors
3. Test in different browsers
4. Check hosting provider status

## Additional Resources

- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Web.dev Performance](https://web.dev/performance/)
- [MDN Web Docs](https://developer.mozilla.org/)
