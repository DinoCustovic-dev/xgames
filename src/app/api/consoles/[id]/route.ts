import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';

// PUT /api/consoles/[id] - Update console status (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, password } = body;

    // Validate status
    if (status !== 'free' && status !== 'occupied') {
      return NextResponse.json(
        { error: 'Invalid status. Must be "free" or "occupied"' },
        { status: 400 }
      );
    }

    // Verify admin password
    if (!password) {
      return NextResponse.json(
        { error: 'Admin password required' },
        { status: 401 }
      );
    }

    const admin = await prisma.admin.findFirst();
    if (!admin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 500 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid admin password' },
        { status: 401 }
      );
    }

    // Update console status
    const consoleId = parseInt(params.id);
    const updatedConsole = await prisma.console.update({
      where: { id: consoleId },
      data: { status },
    });

    return NextResponse.json(
      { console: updatedConsole, message: 'Status updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating console status:', error);
    return NextResponse.json(
      { error: 'Failed to update console status' },
      { status: 500 }
    );
  }
}

