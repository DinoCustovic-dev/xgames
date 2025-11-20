import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/consoles - Get all console statuses
export async function GET() {
  try {
    const consoles = await prisma.console.findMany({
      orderBy: { number: 'asc' },
      select: {
        id: true,
        number: true,
        name: true,
        status: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ consoles }, { status: 200 });
  } catch (error) {
    console.error('Error fetching consoles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch console statuses' },
      { status: 500 }
    );
  }
}

