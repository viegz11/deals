const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@deals.local' },
    update: {},
    create: { name: 'Admin', email: 'admin@deals.local', password: 'admin123', role: 'ADMIN' }
  });

  const books = await prisma.niche.upsert({
    where: { slug: 'books' }, update: {}, create: { name: 'Books', slug: 'books' }
  });
  const shoes = await prisma.niche.upsert({
    where: { slug: 'shoes' }, update: {}, create: { name: 'Shoes', slug: 'shoes' }
  });

  const fiction = await prisma.category.upsert({
    where: { slug_nicheId: { slug: 'fiction', nicheId: books.id } },
    update: {}, create: { name: 'Fiction', slug: 'fiction', nicheId: books.id }
  });

  await prisma.product.createMany({
    data: [
      {
        title: 'Atomic Habits',
        description: 'Popular habit-building book',
        imageUrl: '/bimg/non-fic/Atomic Habits.jpg',
        affiliateUrl: 'https://example.com/atomic-habits',
        nicheId: books.id,
        categoryId: fiction.id,
        tags: 'self-help,books',
        status: 'PUBLISHED',
        isFeatured: true,
        createdBy: admin.id,
        updatedBy: admin.id,
        publishedAt: new Date(),
      }
    ],
    skipDuplicates: true
  });

  console.log('Seeded');
}

main().finally(() => prisma.$disconnect());
