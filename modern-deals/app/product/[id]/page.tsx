import { prisma } from '@/lib/prisma';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id }, include: { niche: true, category: true } });
  if (!product) return <div className="card">Product not found</div>;

  return (
    <div className="card">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Niche: {product.niche.name} | Category: {product.category.name}</p>
      <a href={product.affiliateUrl} target="_blank">Go to affiliate link</a>
      <script dangerouslySetInnerHTML={{ __html: `fetch('/api/events',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({eventType:'VIEW_PRODUCT',productId:'${product.id}',nicheId:'${product.nicheId}',sessionId:localStorage.getItem('sid')||'anon',source:document.referrer})})` }} />
    </div>
  );
}
