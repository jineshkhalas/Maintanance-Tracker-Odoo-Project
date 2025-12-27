const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const team = await prisma.team.upsert({
    where: { name: 'IT Support' },
    update: {},
    create: { name: 'IT Support' },
  });

  const equipment = await prisma.equipment.create({
    data: {
      name: 'Dell XPS 15',
      serialNumber: 'SN-9901',
      department: 'Development',
      location: 'Floor 2, Desk 12',
      purchaseDate: new Date(),
      warrantyExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
      maintenanceTeamId: team.id
    }
  });

  console.log('Seed data created successfully!');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());