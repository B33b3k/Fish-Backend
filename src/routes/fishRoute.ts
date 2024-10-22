import { Router } from 'express';
import Fish from '../models/Fish';

const router = Router();

// list fishes
router.get('/', async (req, res) => {
    try {
        const fish = await Fish.findAll();
        res.json(fish);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get fish.' });
    }
});

// Create a fish
router.post('/', async (req, res) => {
    const { name, hitPoints, frequency, speed, payoutMultiplier } = req.body;
    console.log(req.body);
    try {
        const fish = await Fish.create({ name, hitPoints, frequency, payoutMultiplier, speed });
        res.status(201).json(fish);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create fish.' });
        console.log(error);
    }
});

export default router;
