const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTeam = async (req, res) => {
  try {
    const team = await prisma.team.create({
      data: { name: req.body.name }
    });
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTeams = async (req, res) => {
  const teams = await prisma.team.findMany({ include: { members: true } });
  res.json(teams);
};