import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const clinics = await Promise.all([
    prisma.clinic.upsert({
      where: { name: "南歯科クリニック" },
      update: {},
      create: { name: "南歯科クリニック" },
    }),
    prisma.clinic.upsert({
      where: { name: "北矯正歯科" },
      update: {},
      create: { name: "北矯正歯科" },
    }),
  ]);

  console.log(`Seeded ${clinics.length} clinics`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
