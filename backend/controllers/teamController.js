const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTeam = async (req, res) => {
  try {
    const { name, company, members } = req.body;

    if (!name || !company) {
      return res.status(400).json({ error: "Team Name and Company are required." });
    }

    const membersArray = Array.isArray(members) ? members : [];

    const team = await prisma.team.create({
      data: {
        name: name.trim(),
        company: company.trim(),
        members: membersArray
      }
    });

    res.status(201).json(team);
  } catch (error) {
    console.error("Backend Error:", error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "A team with this name already exists." });
    }
    
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};
exports.getAllTeams = async (req, res) => {
  const teams = await prisma.team.findMany({ include: { members: true } });
  res.json(teams);
};