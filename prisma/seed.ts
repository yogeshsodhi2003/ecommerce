// seed/flipkartSeed.ts
import { PrismaClient } from "../src/generated/prisma/index.js";
import fs from "fs";
import slugify from "slugify";
const prisma = new PrismaClient();

function createUniqueSlug(title: string, index: number): string {
  const base = slugify(title, { lower: true, strict: true });
  return `${base}-${index}`;
}

async function seedFlipkartProducts() {
  try {
    const raw = fs.readFileSync("./data/flipkartdata.json", "utf-8");
    const data = JSON.parse(raw);

    if (!Array.isArray(data)) {
      throw new Error("JSON file does not contain an array of products");
    }

    // 🧹 Clear old data
    await prisma.product.deleteMany();

    console.log(`⛏️ Seeding ${data.length} products...`);

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!item?.title || !item?.selling_price || !item?.images) {
        console.warn(`⚠️ Skipping invalid entry at index ${i}`);
        continue;
      }

      const price = parseFloat(item.selling_price.replace(/[^\d.]/g, "")) || 0;
      const slug = createUniqueSlug(item.title, i);

      try {
        await prisma.product.create({
          data: {
            title: item.title,
            slug,
            description: item.description || "No description available.",
            price,
            inStock: !item.out_of_stock, // true means out of stock
            images: item.images,
            rating: parseFloat(item.average_rating) || 0,
            brand: item.brand || "Unknown",
            seller: item.seller || "Unknown",
            category: item.category || "Uncategorized",
          },
        });
      } catch (productErr: any) {
        console.error(`💥 Failed to create product at index ${i} (${slug}):`);
        console.error(productErr?.meta || productErr?.message || productErr);
      }
    }

    console.log(`✅ Successfully seeded Flipkart data.`);
  } catch (err) {
    console.error("🔥 Seeder failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seedFlipkartProducts();
