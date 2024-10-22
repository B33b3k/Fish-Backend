import { Router } from 'express';
import Player from '../models/Player';

const router = Router();

// Create a player
router.post('/', async (req, res) => {
    const { name, credits } = req.body;
    console.log('name:', name);
    console.log('credits:', credits);
    try {
        const player = await Player.create({ name, credits });
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create player.' });
        console.log('error:', error);
    }
});

// Get player details
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const player = await Player.findByPk(id);
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ error: 'Player not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve player.' });
    }
});

export default router;
