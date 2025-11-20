# Vercel Environment Variables Setup

## Obavezne Environment Varijable

### 1. DATABASE_URL
**Vrednost:** PostgreSQL connection string

**Opcije:**

#### Opcija A: Vercel Postgres (Preporučeno)
1. Idi u Vercel Dashboard → Tvoj projekat → Storage
2. Klikni "Create Database" → Izaberi "Postgres"
3. Vercel automatski kreira environment varijable:
   - `POSTGRES_PRISMA_URL` - koristi ovu kao `DATABASE_URL`
   - Ili `POSTGRES_URL_NON_POOLING`

**Koristi:** `POSTGRES_PRISMA_URL` kao vrednost za `DATABASE_URL`

#### Opcija B: Neon (Besplatno)
1. Idi na https://neon.tech
2. Kreiraj novi projekat
3. Kopiraj connection string
4. Format: `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`

#### Opcija C: Supabase (Besplatno)
1. Idi na https://supabase.com
2. Kreiraj novi projekat
3. Idi u Settings → Database
4. Kopiraj connection string (URI format)

---

## Kako dodati na Vercel:

1. Idi u Vercel Dashboard → Tvoj projekat
2. Klikni "Settings" → "Environment Variables"
3. Dodaj svaku varijablu:
   - **Key:** `DATABASE_URL`
   - **Value:** (tvoj PostgreSQL connection string)
   - **Environment:** Production, Preview, Development (sve tri)
4. Klikni "Save"

---

## Posle dodavanja:

1. Vercel će automatski pokrenuti novi build
2. Ako koristiš Vercel Postgres, trebaće ti da promeniš Prisma schema na PostgreSQL
3. Pokreni migracije: `npx prisma migrate deploy` (ili automatski kroz build)

---

## Napomena:

SQLite (`file:./dev.db`) **NE RADI** na Vercel-u jer je filesystem read-only.
Moraš koristiti PostgreSQL ili neku drugu managed bazu.

