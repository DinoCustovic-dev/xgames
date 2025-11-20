-- CreateTable
CREATE TABLE "Console" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'Console',
    "number" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'free',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT
);

-- CreateTable
CREATE TABLE "GameConsole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "consoleId" INTEGER NOT NULL,
    CONSTRAINT "GameConsole_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GameConsole_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "Console" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Console_number_key" ON "Console"("number");

-- CreateIndex
CREATE UNIQUE INDEX "GameConsole_gameId_consoleId_key" ON "GameConsole"("gameId", "consoleId");
