import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.niche.findMany({ include: { categories: true }, orderBy: { name: 'asc' } });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const created = await prisma.niche.create({ data: { name: body.name, slug: body.slug, status: body.status ?? 'active' } });
  return NextResponse.json(created, { status: 201 });
}
