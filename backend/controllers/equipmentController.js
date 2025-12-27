const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createEquipment = async (req, res) => {
  try {
    const equipment = await prisma.equipment.create({ data: req.body });
    res.status(201).json(equipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEquipment = async (req, res) => {
  const { department, search } = req.query;
  try {
    const equipment = await prisma.equipment.findMany({
      where: {
        department: department || undefined,
        name: search ? { contains: search, mode: 'insensitive' } : undefined,
      },
      include: { 
        maintenanceTeam: true,
        requests: { where: { NOT: { status: "Repaired" } } } 
      }
    });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEquipmentHistory = async (req, res) => {
  try {
    const requests = await prisma.request.findMany({
      where: { equipmentId: req.params.id },
      include: { technician: true }
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};