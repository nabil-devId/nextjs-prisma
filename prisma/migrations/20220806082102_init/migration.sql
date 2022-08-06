-- CreateTable
CREATE TABLE "Mahasiswa" (
    "idUser" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "nama" TEXT,
    "jurusanId" INTEGER NOT NULL,
    CONSTRAINT "Mahasiswa_jurusanId_fkey" FOREIGN KEY ("jurusanId") REFERENCES "Jurusan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Jurusan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namaJurusan" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_email_key" ON "Mahasiswa"("email");
