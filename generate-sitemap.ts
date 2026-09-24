import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from './src/data/products';
import { industries } from './src/data/industries';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://fieldappfinder.com';

function generateSitemap() {
  const links = [
    '/',
    '/about',
    '/methodology',
    '/privacy',
    '/terms',
    '/reviews',
    '/comparisons',
    '/calculator',
    '/roi-calculator',
    '/industries',
    '/pricing-guide',
    '/resources'
  ];

  // Add all industry guides
  industries.forEach(ind => {
    links.push(`/industries/${ind.slug}`);
  });

  // Add all product reviews
  products.forEach(p => {
    links.push(`/reviews/${p.slug}`);
  });

  // Add all comparisons
  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      links.push(`/compare/${products[i].slug}-vs-${products[j].slug}`);
    }
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${links.map(link => `
  <url>
    <loc>${DOMAIN}${link}</loc>
    <changefreq>weekly</changefreq>
    <priority>${link === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml.trim());
  console.log('✅ Generated sitemap.xml in /public');
}

generateSitemap();
