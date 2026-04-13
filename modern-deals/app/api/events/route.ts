import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const created = await prisma.analyticsEvent.create({
    data: {
      eventType: body.eventType,
      productId: body.productId,
      nicheId: body.nicheId,
      sessionId: body.sessionId || 'anon',
      source: body.source,
      device: body.device,
      country: body.country,
    }
  });
  return NextResponse.json(created, { status: 201 });
}
