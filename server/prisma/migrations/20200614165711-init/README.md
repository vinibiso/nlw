# Migration `20200614165711-init`

This migration has been generated at 6/14/2020, 4:57:11 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Point" (
"city" TEXT NOT NULL  ,"email" TEXT NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"image" TEXT NOT NULL  ,"latitude" REAL NOT NULL  ,"longitude" REAL NOT NULL  ,"name" TEXT NOT NULL  ,"uf" TEXT NOT NULL  ,"whatsapp" TEXT NOT NULL  )

CREATE TABLE "quaint"."Item" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"image" TEXT NOT NULL  ,"title" TEXT NOT NULL  )

CREATE TABLE "quaint"."User" (
"email" TEXT NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"password" TEXT NOT NULL  )

CREATE TABLE "quaint"."_ItemToPoint" (
"A" INTEGER NOT NULL  ,"B" INTEGER NOT NULL  ,FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "Point"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")

CREATE UNIQUE INDEX "quaint"."_ItemToPoint_AB_unique" ON "_ItemToPoint"("A","B")

CREATE  INDEX "quaint"."_ItemToPoint_B_index" ON "_ItemToPoint"("B")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200614165711-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,34 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "sqlite"
+  url      = "file:database.sqlite"
+}
+
+model Point {
+  city        String
+  email       String
+  id          Int           @default(autoincrement()) @id
+  image       String
+  latitude    Float
+  longitude   Float
+  name        String
+  uf          String
+  whatsapp    String
+  items       Item[]        @relation(references: [id])
+}
+
+model Item {
+  id          Int           @default(autoincrement()) @id
+  image       String
+  title       String
+  points Point[]       @relation(references: [id])
+}
+
+model User {
+  email    String @unique
+  id       Int    @default(autoincrement()) @id
+  password String
+}
```


