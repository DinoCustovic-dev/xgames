import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/games - Get all games with console assignments
export async function GET() {
  try {
    const games = await prisma.game.findMany({
      orderBy: { name: 'asc' },
      include: {
        consoles: {
          include: {
            console: {
              select: {
                id: true,
                number: true,
                name: true,
              },
            },
          },
        },
      },
    });

    // Transform data for easier consumption
    const gamesWithConsoles = games.map((game) => ({
      id: game.id,
      name: game.name,
      imageUrl: game.imageUrl,
      consoles: game.consoles.map((gc) => gc.console),
    }));

    return NextResponse.json({ games: gamesWithConsoles }, { status: 200 });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}

