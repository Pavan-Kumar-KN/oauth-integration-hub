-- CreateTable
CREATE TABLE "AuthToken" (
    "id" SERIAL NOT NULL,
    "oauth_app" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "tokenType" TEXT,
    "raw" JSONB,

    CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("id")
);
