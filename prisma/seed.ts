
import { PrismaClient } from '../src/generated/prisma/index.js';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create some base categories
  const categories = ['Electronics', 'Fashion', 'Home', 'Toys', 'Books'];
  const categoryMap: Record<string, string> = {};

  for (const name of categories) {
    const cat = await prisma.category.create({ data: { name } });
    categoryMap[name] = cat.id;
  }

  // Create 100 random products
  const products = Array.from({ length: 100 }).map(() => {
    const categoryName = faker.helpers.arrayElement(categories);
    return {
      title: faker.commerce.productName(),
      slug: faker.helpers.slugify(faker.commerce.productName()).toLowerCase(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 999, dec: 2 })),
      images: [faker.image.urlLoremFlickr({ category: 'product' })],
      categoryId: categoryMap[categoryName],
    };
  });

  await prisma.product.createMany({
    data: products,
  });

  console.log('✅ Seeded 100 fake products successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
