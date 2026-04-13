import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const items = body.items ?? [];
  let inserted = 0;
  for (const item of items) {
    await prisma.product.create({
      data: {
        title: item.title,
        description: item.description ?? '',
        imageUrl: item.imageUrl ?? '',
        affiliateUrl: item.affiliateUrl,
        nicheId: item.nicheId,
        categoryId: item.categoryId,
        tags: item.tags ?? '',
        status: item.status ?? 'DRAFT'
      }
    });
    inserted++;
  }
  return NextResponse.json({ ok: true, inserted });
}
