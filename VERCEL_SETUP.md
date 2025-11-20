# 🚀 Vercel Setup Guide - XGAMES

## Quick Setup (3 Steps)

### 1. Create PostgreSQL Database

**Option A: Vercel Postgres (Recommended)**
1. Go to Vercel Dashboard → Your Project → **Storage**
2. Click **"Create Database"** → Select **"Postgres"**
3. Vercel will automatically create `POSTGRES_PRISMA_URL`
4. Copy the value from `POSTGRES_PRISMA_URL`

**Option B: Neon (Free)**
1. Go to https://neon.tech
2. Sign up and create a new project
3. Copy the connection string (format: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`)

**Option C: Supabase (Free)**
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database → Connection string (URI)
4. Copy the connection string

---

### 2. Add Environment Variable on Vercel

1. Go to **Vercel Dashboard** → Your Project
2. Click **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Enter:
   - **Key:** `DATABASE_URL`
   - **Value:** (Your PostgreSQL connection string from step 1)
   - **Environment:** Select all (Production, Preview, Development)
5. Click **"Save"**

---

### 3. Deploy

Vercel will automatically:
- ✅ Install dependencies (`yarn install`)
- ✅ Generate Prisma Client (`prisma generate`)
- ✅ Run migrations (`prisma migrate deploy`)
- ✅ Build the app (`yarn build`)
- ✅ Deploy to production

**That's it!** Your app should be live. 🎉

---

## Manual Setup (If Needed)

If you want to test locally with PostgreSQL:

```bash
# Set DATABASE_URL in .env file
echo "DATABASE_URL=your_postgresql_connection_string" > .env

# Run setup script
chmod +x scripts/setup-vercel.sh
./scripts/setup-vercel.sh
```

Or manually:

```bash
# Install dependencies
yarn install

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
yarn db:seed
```

---

## Troubleshooting

### Error: "Prisma Client not generated"
- Make sure `prisma generate` runs during build
- Check that `postinstall` script is in package.json ✅

### Error: "Database connection failed"
- Verify `DATABASE_URL` is set correctly in Vercel
- Check that PostgreSQL database is accessible
- Ensure connection string includes `?sslmode=require` for cloud databases

### Error: "Migration failed"
- Make sure migrations are up to date
- Check database permissions
- Verify schema matches migrations

---

## Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string |

**Total: 1 environment variable**

---

## Support

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables are set
3. Ensure PostgreSQL database is running
4. Check Prisma migrations are applied

