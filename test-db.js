const prisma = require("./src/prisma/prismaClient");

async function main() {
  await prisma.$connect();
  console.log("✅ Database Connected Successfully");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
});

