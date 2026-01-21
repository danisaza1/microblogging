const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanup() {
  const idsToDelete = [39, 50, 73, 74];

  await prisma.post.deleteMany({
    where: { id: { in: idsToDelete } },
  });

  console.log(`🧹 Articles supprimés : ${idsToDelete.join(', ')}`);
}

cleanup()
  .catch((error) => {
    console.error('❌ Erreur lors de la suppression :', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
