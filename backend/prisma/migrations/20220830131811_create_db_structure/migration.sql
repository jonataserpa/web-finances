-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_user" TEXT NOT NULL,
    "company_id_user" TEXT NOT NULL,
    "dateborn" TEXT NOT NULL,
    "radiogender" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "deleteAt" DATETIME,
    CONSTRAINT "users_company_id_user_fkey" FOREIGN KEY ("company_id_user") REFERENCES "companys" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "companys" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reasonsocial" TEXT NOT NULL,
    "namefantasy" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "phone_company" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "deleteAt" DATETIME
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cep" TEXT NOT NULL,
    "adrees" TEXT NOT NULL,
    "number_end" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "user_id" TEXT,
    "company_id_address" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "deleteAt" DATETIME,
    CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "address_company_id_address_fkey" FOREIGN KEY ("company_id_address") REFERENCES "companys" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- CreateIndex
CREATE INDEX "companys_reasonsocial_idx" ON "companys"("reasonsocial");
