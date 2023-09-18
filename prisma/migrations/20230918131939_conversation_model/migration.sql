-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "firstMemberId" TEXT NOT NULL,
    "secondMemberId" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Conversation_secondMemberId_idx" ON "Conversation"("secondMemberId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_firstMemberId_secondMemberId_key" ON "Conversation"("firstMemberId", "secondMemberId");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_firstMemberId_fkey" FOREIGN KEY ("firstMemberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_secondMemberId_fkey" FOREIGN KEY ("secondMemberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
