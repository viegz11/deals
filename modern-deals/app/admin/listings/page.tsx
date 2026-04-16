import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function ListingsPage() {
  const products = await prisma.product.findMany({ include: { niche: true, category: true }, orderBy: { updatedAt: 'desc' } });

  return (
    <div className="card">
      <h2>Listings Workspace</h2>
      <div>
        <Link href="/admin/products">Create Product</Link> | <a href="/api/export">Export CSV</a>
      </div>
      <table>
        <thead><tr><th>Title</th><th>Niche</th><th>Category</th><th>Status</th><th>Link</th></tr></thead>
        <tbody>
          {products.map((p: { id: string; title: string; niche: { name: string }; category: { name: string }; status: string; affiliateUrl: string }) => (
            <tr key={p.id}>
              <td>{p.title}</td><td>{p.niche.name}</td><td>{p.category.name}</td><td>{p.status}</td><td><a href={p.affiliateUrl}>open</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Bulk actions via API: POST /api/bulk with ids[] and action(publish/archive/draft/delete).</p>
    </div>
  );
}
