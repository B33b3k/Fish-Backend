import express, { Router, Request, Response, RequestHandler } from 'express';
import Player from '../models/Player';
import Fish from '../models/Fish';
import Catch from '../models/Catch';

const router: Router = express.Router();

interface CatchRequest {
    playerId: number;
    fishId: number;
}

const catchFish: RequestHandler = async (
    req: Request<{}, {}, CatchRequest>,
    res: Response
): Promise<void> => {
    const { playerId, fishId } = req.body;

    try {
        const player = await Player.findByPk(playerId);
        const fish = await Fish.findByPk(fishId);
        //edge cases

        if (!player) {
            res.status(404).json({ error: 'Player not found.' });
            return;
        }

        if (!fish) {
            res.status(404).json({ error: 'Fish not found.' });
            return;
        }

        // checking the probabbility to catch fish based on the fish frequency and Speed
        const randomValue = Math.random() * 100;
        const catchSuccess = randomValue <= (fish.frequency * fish.speed);

        if (catchSuccess) {

            const creditsEarned = fish.payoutMultiplier * fish.hitPoints;
            player.credits += creditsEarned; //update credits
            await player.save();

            //create catch
            await Catch.create({
                playerId: player.id,
                fishId: fish.id,
                creditsEarned,
            });

            res.status(201).json({
                message: 'Catch successful!',
                creditsEarned,
                newBalance: player.credits,
            });
        } else {
            //failed to catch fish
            res.status(200).json({
                message: 'Catch failed. Try again!',
                details: {
                    roll: randomValue.toFixed(2),
                    needed: fish.frequency * fish.speed,
                    fishName: fish.name,
                },
            });
        }
    } catch (error) {

        res.status(500).json({
            error: 'Failed to catch fish.',
            details: error instanceof Error ? error.message : String(error),
        });
    }
};

router.post('/', catchFish);

// list all catches

router.get('/', async (req, res) => {
    try {
        const catches = await Catch.findAll();
        res.json(catches);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get catches.' });
    }
});

export default router;
