import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';

// POST /api/admin/login - Verify admin password
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password required' },
        { status: 400 }
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
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during admin login:', error);
    return NextResponse.json(
      { error: 'Failed to verify password' },
      { status: 500 }
    );
  }
}

