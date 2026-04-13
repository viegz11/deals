import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';
  const niche = searchParams.get('niche') ?? undefined;
  const status = searchParams.get('status') ?? undefined;

  const data = await prisma.product.findMany({
    where: {
      title: { contains: q },
      niche: niche ? { slug: niche } : undefined,
      status: status as any || undefined
    },
    include: { niche: true, category: true },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const created = await prisma.product.create({
    data: {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      affiliateUrl: body.affiliateUrl,
      nicheId: body.nicheId,
      categoryId: body.categoryId,
      tags: body.tags ?? '',
      status: body.status ?? 'DRAFT'
    }
  });
  return NextResponse.json(created, { status: 201 });
}
