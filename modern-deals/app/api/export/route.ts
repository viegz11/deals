import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({ include: { niche: true, category: true } });
  const rows = ['id,title,niche,category,status,affiliateUrl'];
  for (const p of products) rows.push([p.id, p.title, p.niche.name, p.category.name, p.status, p.affiliateUrl].map((s) => `"${String(s).replace(/"/g, '""')}"`).join(','));
  return new NextResponse(rows.join('\n'), {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="products.csv"'
    }
  });
}
