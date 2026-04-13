import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.category.findMany({ include: { niche: true }, orderBy: { name: 'asc' } });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const created = await prisma.category.create({ data: { name: body.name, slug: body.slug, nicheId: body.nicheId } });
  return NextResponse.json(created, { status: 201 });
}
