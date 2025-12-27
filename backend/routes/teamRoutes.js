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
    const team = await prisma.team.create({ data: req.body });
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;