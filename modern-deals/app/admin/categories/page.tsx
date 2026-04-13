import { prisma } from '@/lib/prisma';

export default async function CategoriesAdminPage() {
  const categories = await prisma.category.findMany({ include: { niche: true } });
  return (
    <div className="card">
      <h2>Categories</h2>
      <p>POST /api/categories to create.</p>
      <ul>{categories.map((c) => <li key={c.id}>{c.name} ({c.slug}) - {c.niche.name}</li>)}</ul>
    </div>
  );
}
