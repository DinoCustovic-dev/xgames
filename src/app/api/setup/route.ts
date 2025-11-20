import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';

// POST /api/setup - Run migrations and seed database (one-time setup)
export async function POST() {
  try {
    // Check if database is already set up
    const existingConsoles = await prisma.console.findMany();
    if (existingConsoles.length > 0) {
      return NextResponse.json(
        { 
          message: 'Database already initialized',
          consoles: existingConsoles.length 
        },
        { status: 200 }
      );
    }

    // Create 4 consoles
    const consoles = await Promise.all([
      prisma.console.upsert({
        where: { number: 1 },
        update: {},
        create: {
          number: 1,
          name: 'Console 1',
          status: 'free',
        },
      }),
      prisma.console.upsert({
        where: { number: 2 },
        update: {},
        create: {
          number: 2,
          name: 'Console 2',
          status: 'free',
        },
      }),
      prisma.console.upsert({
        where: { number: 3 },
        update: {},
        create: {
          number: 3,
          name: 'Console 3',
          status: 'free',
        },
      }),
      prisma.console.upsert({
        where: { number: 4 },
        update: {},
        create: {
          number: 4,
          name: 'Console 4',
          status: 'free',
        },
      }),
    ]);

    // Create 15 popular PS5 games
    const games = [
      { name: 'God of War Ragnarök', imageUrl: null },
      { name: 'Spider-Man 2', imageUrl: null },
      { name: 'Horizon Forbidden West', imageUrl: null },
      { name: 'Ratchet & Clank: Rift Apart', imageUrl: null },
      { name: 'Demon\'s Souls', imageUrl: null },
      { name: 'Returnal', imageUrl: null },
      { name: 'Gran Turismo 7', imageUrl: null },
      { name: 'Final Fantasy XVI', imageUrl: null },
      { name: 'Baldur\'s Gate 3', imageUrl: null },
      { name: 'Elden Ring', imageUrl: null },
      { name: 'Call of Duty: Modern Warfare III', imageUrl: null },
      { name: 'FIFA 24', imageUrl: null },
      { name: 'NBA 2K24', imageUrl: null },
      { name: 'Mortal Kombat 1', imageUrl: null },
      { name: 'Tekken 8', imageUrl: null },
    ];

    const createdGames = await Promise.all(
      games.map((game) =>
        prisma.game.upsert({
          where: { name: game.name },
          update: {},
          create: game,
        })
      )
    );

    // Assign games to consoles (some overlap, some don't)
    const gameConsolePairs = [
      // Console 1 (games 1-8)
      { consoleId: consoles[0].id, gameId: createdGames[0].id },
      { consoleId: consoles[0].id, gameId: createdGames[1].id },
      { consoleId: consoles[0].id, gameId: createdGames[2].id },
      { consoleId: consoles[0].id, gameId: createdGames[3].id },
      { consoleId: consoles[0].id, gameId: createdGames[4].id },
      { consoleId: consoles[0].id, gameId: createdGames[5].id },
      { consoleId: consoles[0].id, gameId: createdGames[6].id },
      { consoleId: consoles[0].id, gameId: createdGames[7].id },
      // Console 2 (games 3-10)
      { consoleId: consoles[1].id, gameId: createdGames[2].id },
      { consoleId: consoles[1].id, gameId: createdGames[3].id },
      { consoleId: consoles[1].id, gameId: createdGames[4].id },
      { consoleId: consoles[1].id, gameId: createdGames[5].id },
      { consoleId: consoles[1].id, gameId: createdGames[6].id },
      { consoleId: consoles[1].id, gameId: createdGames[7].id },
      { consoleId: consoles[1].id, gameId: createdGames[8].id },
      { consoleId: consoles[1].id, gameId: createdGames[9].id },
      // Console 3 (games 5-12)
      { consoleId: consoles[2].id, gameId: createdGames[4].id },
      { consoleId: consoles[2].id, gameId: createdGames[5].id },
      { consoleId: consoles[2].id, gameId: createdGames[6].id },
      { consoleId: consoles[2].id, gameId: createdGames[7].id },
      { consoleId: consoles[2].id, gameId: createdGames[8].id },
      { consoleId: consoles[2].id, gameId: createdGames[9].id },
      { consoleId: consoles[2].id, gameId: createdGames[10].id },
      { consoleId: consoles[2].id, gameId: createdGames[11].id },
      // Console 4 (games 7-15)
      { consoleId: consoles[3].id, gameId: createdGames[6].id },
      { consoleId: consoles[3].id, gameId: createdGames[7].id },
      { consoleId: consoles[3].id, gameId: createdGames[8].id },
      { consoleId: consoles[3].id, gameId: createdGames[9].id },
      { consoleId: consoles[3].id, gameId: createdGames[10].id },
      { consoleId: consoles[3].id, gameId: createdGames[11].id },
      { consoleId: consoles[3].id, gameId: createdGames[12].id },
      { consoleId: consoles[3].id, gameId: createdGames[13].id },
      { consoleId: consoles[3].id, gameId: createdGames[14].id },
    ];

    for (const pair of gameConsolePairs) {
      await prisma.gameConsole.upsert({
        where: {
          gameId_consoleId: {
            gameId: pair.gameId,
            consoleId: pair.consoleId,
          },
        },
        update: {},
        create: pair,
      });
    }

    // Create default admin (password: "admin123" - CHANGE IN PRODUCTION!)
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.admin.upsert({
      where: { id: 1 },
      update: {},
      create: {
        passwordHash: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Database initialized successfully!',
        consoles: consoles.length,
        games: createdGames.length,
        adminPassword: 'admin123 (CHANGE THIS!)',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error,
      },
      { status: 500 }
    );
  }
}

// GET /api/setup - Check database status
export async function GET() {
  try {
    const consoleCount = await prisma.console.count();
    const gameCount = await prisma.game.count();
    const adminCount = await prisma.admin.count();

    return NextResponse.json(
      {
        initialized: consoleCount > 0,
        consoles: consoleCount,
        games: gameCount,
        admins: adminCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        initialized: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

