-- CreateTable
CREATE TABLE "SkillforgeState" (
    "id" TEXT NOT NULL,
    "revision" INTEGER NOT NULL DEFAULT 0,
    "payload" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillforgeState_pkey" PRIMARY KEY ("id")
);
