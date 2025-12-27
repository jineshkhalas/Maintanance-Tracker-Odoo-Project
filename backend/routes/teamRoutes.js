const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const teams = await prisma.team.findMany();
  res.json(teams);
});

router.post('/', async (req, res) => {
  try {
    const { name, company, members } = req.body;

    const team = await prisma.team.create({
      data: {
        name: name,
        company: company,
        members: members || []
      }
    });

    res.status(201).json(team);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Team name already exists" });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;