# Responsive Performance Site

A minimal, fully responsive, and performance-optimized website built with modern web standards.

## Features

### Responsive Design
- **Mobile-first approach**: Optimized for mobile devices first, then progressively enhanced for larger screens
- **Breakpoints**:
  - Small mobile: ≤480px
  - Tablet: ≥768px
  - Desktop: ≥1024px
- **Flexible layouts**: CSS Grid and Flexbox for adaptive layouts
- **Responsive typography**: Font sizes scale appropriately across breakpoints
- **Responsive spacing**: Spacing variables adjust for optimal readability on all devices

### Performance Optimizations

#### Image Optimization
- **Multiple formats**: WebP with JPEG fallbacks using `<picture>` elements
- **Responsive images**: `srcset` and `sizes` attributes for appropriate image sizing
- **Lazy loading**: `loading="lazy"` on non-critical images
- **Proper dimensions**: Width and height attributes prevent layout shift

#### Code Optimization
- **Minified assets**: Production build minifies HTML, CSS, and JavaScript
- **Modern build tool**: Vite for fast development and optimized production builds
- **Clean code**: Semantic HTML5 for better performance and accessibility

### Mobile Navigation
- **Collapsible menu**: Hamburger menu on mobile devices
- **Smooth transitions**: Animated menu open/close
- **Accessible**: ARIA attributes for screen readers
- **Desktop navigation**: Full horizontal menu on tablet and desktop

### SEO & Meta Tags
- **Viewport meta tag**: Proper mobile viewport configuration
- **Description meta tag**: Clear site description
- **Open Graph tags**: Social media sharing optimization
- **Twitter Card tags**: Twitter-specific sharing metadata
- **Favicon support**: Multiple sizes for various devices
- **Semantic HTML**: Proper heading hierarchy and landmarks

### Accessibility
- **ARIA labels**: Screen reader support for interactive elements
- **Keyboard navigation**: Full keyboard support
- **Focus indicators**: Visible focus states
- **Color contrast**: WCAG compliant color combinations
- **Reduced motion**: Respects `prefers-reduced-motion` preference

### Additional Features
- **Smooth scrolling**: Enhanced navigation experience
- **Intersection Observer**: Fade-in animations for sections
- **Print styles**: Optimized layout for printing
- **Auto-hide navigation**: Navigation bar behavior on scroll (desktop)

## Installation

```bash
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Build

Create an optimized production build:

```bash
npm run build
```

The optimized site will be in the `dist` directory, ready for deployment.

## Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Generate Placeholder Images

To generate placeholder images and favicons:

```bash
node generate-images.js
```

Note: In production, replace these with actual optimized images in WebP and JPEG formats.

## Lighthouse Performance

The site is optimized to achieve high Lighthouse scores:

- **Performance**: Fast loading with optimized assets
- **Accessibility**: Semantic HTML and ARIA support
- **Best Practices**: Modern web standards
- **SEO**: Proper meta tags and semantic structure

### Running Lighthouse

```bash
# Install Lighthouse globally (if not already installed)
npm install -g lighthouse

# Build the site
npm run build

# Preview the build
npm run preview

# Run Lighthouse (in another terminal)
lighthouse http://localhost:4173 --view
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Structure

```
.
├── index.html          # Main HTML file with semantic markup
├── styles.css          # Mobile-first responsive CSS
├── main.js            # JavaScript for navigation and interactions
├── vite.config.js     # Vite build configuration
├── package.json       # Dependencies and scripts
├── public/            # Static assets
│   ├── images/        # Optimized images (WebP + JPEG)
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   └── apple-touch-icon.png
└── generate-images.js # Script to generate placeholder images
```

## Deployment

The built site in the `dist` directory can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Cloudflare Pages

Simply upload the contents of the `dist` directory or connect your repository for automatic deployments.

## Performance Checklist

- ✅ Mobile-first responsive design
- ✅ Responsive breakpoints (≤480px, ≥768px, ≥1024px)
- ✅ Optimized image formats (WebP with fallbacks)
- ✅ Lazy loading for non-critical images
- ✅ srcset and sizes attributes
- ✅ Collapsible mobile navigation
- ✅ Meta tags (viewport, description, Open Graph)
- ✅ Favicon references
- ✅ Minified production build
- ✅ Semantic HTML5
- ✅ Accessibility features
- ✅ Print styles
- ✅ Reduced motion support

## License

MIT
