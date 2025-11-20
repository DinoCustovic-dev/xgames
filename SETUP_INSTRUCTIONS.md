# 🚀 Setup Instructions - XGAMES na Vercel-u

## Problem: Database ne radi

Ako si dodao `DATABASE_URL` ali aplikacija ne radi, sledeći koraci će to rešiti:

---

## ✅ Rešenje (3 koraka)

### 1. Proveri da li je DATABASE_URL postavljen

1. Idi u **Vercel Dashboard** → Tvoj projekat
2. **Settings** → **Environment Variables**
3. Proveri da postoji `DATABASE_URL` sa PostgreSQL connection string-om
4. Format mora biti: `postgresql://user:password@host:port/database?sslmode=require`

---

### 2. Pokreni Setup API (VAŽNO!)

Posle deployment-a, **jednom** pozovi setup API da inicijalizuje bazu:

**Opcija A: Preko browser-a**
```
https://tvoj-projekat.vercel.app/api/setup
```
Klikni na link ili otvori u browser-u. Trebalo bi da vidiš:
```json
{
  "success": true,
  "message": "Database initialized successfully!",
  "consoles": 4,
  "games": 15
}
```

**Opcija B: Preko curl-a**
```bash
curl -X POST https://tvoj-projekat.vercel.app/api/setup
```

**Opcija C: Preko Vercel Dashboard**
1. Idi u **Deployments** → Najnoviji deployment
2. Klikni **"View Function Logs"**
3. U **Functions** tab, nađi `/api/setup`
4. Klikni i pozovi POST request

---

### 3. Proveri Status

Pozovi GET request da proveriš status:
```
https://tvoj-projekat.vercel.app/api/setup
```

Trebalo bi da vidiš:
```json
{
  "initialized": true,
  "consoles": 4,
  "games": 15,
  "admins": 1
}
```

---

## 🔍 Troubleshooting

### Greška: "Failed to fetch"
- Proveri da li je `DATABASE_URL` postavljen
- Proveri da li je connection string validan
- Proveri Vercel build logs za detalje

### Greška: "Migration failed"
- Setup API automatski kreira tabele
- Ako ne radi, proveri database permissions

### Greška: "Prisma Client not generated"
- Build proces automatski generiše Prisma Client
- Proveri build logs na Vercel-u

---

## 📝 Napomene

- **Admin password:** `admin123` (PROMENI OVO U PRODUKCIJI!)
- Setup API možeš pozvati više puta - bezbedno je (neće duplirati podatke)
- Ako već postoje podaci, API će vratiti status bez kreiranja novih

---

## ✅ Checklist

- [ ] `DATABASE_URL` je postavljen na Vercel-u
- [ ] Deployment je uspešan
- [ ] Pozvao sam `/api/setup` endpoint
- [ ] Proverio sam status preko `/api/setup` GET request-a
- [ ] Aplikacija sada radi! 🎉

