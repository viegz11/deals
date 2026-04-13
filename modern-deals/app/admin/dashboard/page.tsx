import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const [views, clicks, outbound, purchases, topProducts, nichePerf] = await Promise.all([
    prisma.analyticsEvent.count({ where: { eventType: 'VIEW_PRODUCT' } }),
    prisma.analyticsEvent.count({ where: { eventType: 'CLICK_PRODUCT' } }),
    prisma.analyticsEvent.count({ where: { eventType: 'OUTBOUND_CLICK' } }),
    prisma.analyticsEvent.count({ where: { eventType: 'PURCHASE_IMPORTED' } }),
    prisma.product.findMany({
      take: 5,
      include: { _count: { select: { events: true } } },
      orderBy: { events: { _count: 'desc' } }
    }),
    prisma.niche.findMany({
      include: { products: { include: { _count: { select: { events: true } } } } }
    })
  ]);

  const ctr = views ? ((outbound / views) * 100).toFixed(2) : '0.00';

  return (
    <div>
      <div className="grid">
        <div className="card">Views: {views}</div>
        <div className="card">Clicks: {clicks}</div>
        <div className="card">Outbound: {outbound}</div>
        <div className="card">Purchases: {purchases}</div>
        <div className="card">CTR: {ctr}%</div>
      </div>
      <div className="card">
        <h3>Top Products</h3>
        <ul>{topProducts.map((p) => <li key={p.id}>{p.title} ({p._count.events} events)</li>)}</ul>
      </div>
      <div className="card">
        <h3>Niche Performance</h3>
        <ul>
          {nichePerf.map((n) => {
            const total = n.products.reduce((acc, p) => acc + p._count.events, 0);
            return <li key={n.id}>{n.name}: {total} events</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
