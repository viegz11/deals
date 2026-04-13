import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const niches = await prisma.niche.findMany({ orderBy: { name: 'asc' } });
  return (
    <div className="card">
      <h2>Niches</h2>
      <div className="grid">
        {niches.map((n) => (
          <Link className="card" href={`/catalog/${n.slug}`} key={n.id}>
            <h3>{n.name}</h3>
            <p>Browse products</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
