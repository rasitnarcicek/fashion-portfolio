const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function createPlaceholderSVG(width, height, text, color = '#3498db') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${color}"/>
    <text x="50%" y="50%" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif">${text}</text>
  </svg>`;
}

const images = [
  { name: 'about-small.jpg', width: 480, height: 320, text: 'About', color: '#3498db' },
  { name: 'about-medium.jpg', width: 768, height: 512, text: 'About', color: '#3498db' },
  { name: 'about-large.jpg', width: 1200, height: 800, text: 'About', color: '#3498db' },
  { name: 'about-small.webp', width: 480, height: 320, text: 'About', color: '#3498db' },
  { name: 'about-medium.webp', width: 768, height: 512, text: 'About', color: '#3498db' },
  { name: 'about-large.webp', width: 1200, height: 800, text: 'About', color: '#3498db' },
  { name: 'og-image.jpg', width: 1200, height: 630, text: 'Minimal Site', color: '#2c3e50' }
];

for (let i = 1; i <= 6; i++) {
  const colors = ['#e74c3c', '#f39c12', '#2ecc71', '#9b59b6', '#1abc9c', '#34495e'];
  images.push(
    { name: `gallery-${i}-small.jpg`, width: 480, height: 360, text: `Gallery ${i}`, color: colors[i-1] },
    { name: `gallery-${i}-large.jpg`, width: 800, height: 600, text: `Gallery ${i}`, color: colors[i-1] },
    { name: `gallery-${i}-small.webp`, width: 480, height: 360, text: `Gallery ${i}`, color: colors[i-1] },
    { name: `gallery-${i}-large.webp`, width: 800, height: 600, text: `Gallery ${i}`, color: colors[i-1] }
  );
}

images.forEach(img => {
  const svg = createPlaceholderSVG(img.width, img.height, img.text, img.color);
  const filePath = path.join(imagesDir, img.name);
  fs.writeFileSync(filePath, svg);
  console.log(`Created: ${img.name}`);
});

function createFavicon(size, filename) {
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#2c3e50" rx="4"/>
    <text x="50%" y="50%" font-size="${size * 0.7}" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-weight="bold">M</text>
  </svg>`;
  const filePath = path.join(__dirname, 'public', filename);
  fs.writeFileSync(filePath, svg);
  console.log(`Created: ${filename}`);
}

createFavicon(32, 'favicon-32x32.png');
createFavicon(16, 'favicon-16x16.png');
createFavicon(180, 'apple-touch-icon.png');

console.log('All placeholder images and favicons generated successfully!');
