import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { ids, action } = body as { ids: string[]; action: 'publish'|'archive'|'draft'|'delete' };

  if (action === 'delete') {
    await prisma.product.deleteMany({ where: { id: { in: ids } } });
    return NextResponse.json({ ok: true, count: ids.length });
  }

  const mapped = action === 'publish' ? 'PUBLISHED' : action === 'archive' ? 'ARCHIVED' : 'DRAFT';
  const updated = await prisma.product.updateMany({ where: { id: { in: ids } }, data: { status: mapped as any } });
  return NextResponse.json({ ok: true, count: updated.count });
}
