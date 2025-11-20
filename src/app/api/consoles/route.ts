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

    // If no consoles exist, return empty array instead of error
    return NextResponse.json({ consoles: consoles || [] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching consoles:', error);
    
    // More detailed error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Database connection failed. Please ensure the database is set up.';
    
    return NextResponse.json(
      { 
        error: errorMessage,
        consoles: [], // Return empty array so UI doesn't break
      },
      { status: 500 }
    );
  }
}

