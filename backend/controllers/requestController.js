const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createRequest = async (req, res) => {
  try {
    const { equipmentId, subject, type, scheduledDate } = req.body;

    /// Fetching Equipment to get its default Maintenance Team
    const equipment = await prisma.equipment.findUnique({
      where: { id: equipmentId },
      include: { maintenanceTeam: true }
    });

    if (!equipment) return res.status(404).json({ error: "Equipment not found" });

    const newRequest = await prisma.request.create({
      data: {
        subject,
        type,
        scheduledDate: new Date(scheduledDate),
        equipmentId,
      },
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};