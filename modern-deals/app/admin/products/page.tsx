import { prisma } from '@/lib/prisma';

export default async function ProductsAdminPage() {
  const [products, niches, categories] = await Promise.all([
    prisma.product.findMany({ include: { niche: true, category: true }, take: 25, orderBy: { createdAt: 'desc' } }),
    prisma.niche.findMany(),
    prisma.category.findMany()
  ]);

  return (
    <div className="card">
      <h2>Products</h2>
      <p>Create via POST /api/products. Required: title, description, imageUrl, affiliateUrl, nicheId, categoryId.</p>
      <p>Niches: {niches.map((n) => n.name).join(', ')}</p>
      <p>Categories: {categories.map((c) => c.name).join(', ')}</p>
      <ul>{products.map((p) => <li key={p.id}>{p.title} - {p.status} - {p.niche.name}/{p.category.name}</li>)}</ul>
    </div>
  );
}
