const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createRequest = async (req, res) => {
  try {
    const { equipmentId, subject, type, scheduledDate } = req.body;

    const equipment = await prisma.equipment.findUnique({
      where: { id: equipmentId }
    });

    if (!equipment) return res.status(404).json({ error: "Equipment not found" });

    const newRequest = await prisma.request.create({
      data: {
        subject,
        type,
        scheduledDate: new Date(scheduledDate),
        equipmentId,
        status: "New"
      },
      include: { equipment: true }
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRequest = async (req, res) => {
  const { id } = req.params;
  const { status, duration, technicianId } = req.body;

  try {
    const updatedRequest = await prisma.request.update({
      where: { id },
      data: {
        status,
        duration: duration ? parseFloat(duration) : undefined,
        technicianId
      }
    });

    if (status === "Scrap") {
      await prisma.equipment.update({
        where: { id: updatedRequest.equipmentId },
        data: { isScrapped: true }
      });
    }

    if (status === "In Progress" || status === "Repaired" || status === "New") {
      await prisma.equipment.update({
        where: { id: updatedRequest.equipmentId },
        data: { isScrapped: false }
      });
    }

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await prisma.request.findMany({
      include: { equipment: true, technician: true }
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};