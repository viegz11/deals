import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function CatalogPage({ params, searchParams }: { params: { slug: string }, searchParams: { q?: string } }) {
  const q = searchParams.q ?? '';
  const niche = await prisma.niche.findUnique({ where: { slug: params.slug } });
  if (!niche) return <div className="card">Niche not found</div>;

  const products = await prisma.product.findMany({
    where: {
      nicheId: niche.id,
      status: 'PUBLISHED',
      title: { contains: q }
    },
    include: { category: true }
  });

  return (
    <div>
      <div className="card">
        <h2>{niche.name}</h2>
        <form>
          <input name="q" placeholder="Search products" defaultValue={q} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="grid">
        {products.map((p: { id: string; title: string; category: { name: string } }) => (
          <Link href={`/product/${p.id}`} className="card" key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
