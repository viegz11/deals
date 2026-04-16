import { prisma } from '@/lib/prisma';

export default async function NicheAdminPage() {
  const niches = await prisma.niche.findMany({ include: { categories: true } });
  return (
    <div className="card">
      <h2>Niches</h2>
      <p>POST /api/niches to create.</p>
      <ul>
        {niches.map((n: { id: string; name: string; slug: string; categories: unknown[] }) => (
          <li key={n.id}>
            {n.name} ({n.slug}) - {n.categories.length} categories
          </li>
        ))}
      </ul>
    </div>
  );
}
