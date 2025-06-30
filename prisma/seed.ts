
import { PrismaClient } from '../src/generated/prisma/index.js';
import fs from 'fs';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function seedAmazonProducts() {
  const raw = fs.readFileSync('./data/amazon-products.json', 'utf-8');
  const data = JSON.parse(raw); // assuming it's an array

  await prisma.product.deleteMany(); // clear fake data

  function createUniqueSlug(title: string, index: number) {
  const base = slugify(title, { lower: true, strict: true });
  return `${base}-${index}`;
}

for (let i = 0; i < data.length; i++) {
  const item = data[i];
  if (!item.title || !item.final_price || !item.image_url) continue;

  try {
    await prisma.product.create({
      data: {
        title: item.title,
        slug: createUniqueSlug(item.title, i), // 🧠 make slug unique
        description: item.description || 'No description available.',
        price: parseFloat(item.final_price.replace(/"/g, '')) || 0,
        currency: item.currency || 'USD',
        inStock: item.availability === 'In Stock',
        image: item.image_url,
        images: [item.image_url],
        rating: item.rating || 0,
        reviewCount: item.reviews_count || 0,
        asin: item.asin,
        brand: item.brand || 'Unknown',
        categories: JSON.parse(item.categories || '[]'),
        sourceUrl: item.url,
      },
    });
  } catch (err) {
    console.warn(`❌ Skipping duplicate or bad product at index ${i}: ${item.title}`);
  }
}


  console.log('✅ Seeded real Amazon product data');
}

seedAmazonProducts();

