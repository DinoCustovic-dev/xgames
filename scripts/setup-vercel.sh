#!/bin/bash

# Vercel Setup Script for xgames
# This script helps set up the project for Vercel deployment

echo "🚀 XGAMES - Vercel Setup Script"
echo "================================"
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL environment variable is not set!"
    echo ""
    echo "Please set DATABASE_URL before running this script."
    echo ""
    echo "Options:"
    echo "1. Vercel Postgres: Create database in Vercel Dashboard → Storage"
    echo "2. Neon: https://neon.tech (free PostgreSQL)"
    echo "3. Supabase: https://supabase.com (free PostgreSQL)"
    echo ""
    exit 1
fi

echo "✅ DATABASE_URL is set"
echo ""

# Check if DATABASE_URL is PostgreSQL
if [[ ! "$DATABASE_URL" =~ ^postgresql:// ]] && [[ ! "$DATABASE_URL" =~ ^postgres:// ]]; then
    echo "⚠️  WARNING: DATABASE_URL doesn't look like a PostgreSQL connection string!"
    echo "   SQLite (file:./dev.db) won't work on Vercel."
    echo "   Please use PostgreSQL for production."
    echo ""
fi

echo "📦 Installing dependencies..."
yarn install

echo ""
echo "🔧 Generating Prisma Client..."
npx prisma generate

echo ""
echo "🗄️  Running database migrations..."
npx prisma migrate deploy

echo ""
echo "🌱 Seeding database..."
yarn db:seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure DATABASE_URL is set in Vercel Dashboard → Environment Variables"
echo "2. Push your code to trigger automatic deployment"
echo "3. Check Vercel Dashboard for deployment status"
echo ""

