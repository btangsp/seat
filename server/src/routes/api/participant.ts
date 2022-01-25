import * as express from 'express';
import db from '../../db';

const router = express.Router();

router.get('/:participant_id', async (req, res) => {
    const participant_id = Number(req.params.participant_id);
    try {
        const participant = await db.participant.one(participant_id);
        res.json(participant);
    } catch (err: unknown) {
        console.log(err);
        let err_message = "";
        if (err instanceof Error) {
            err_message = err.message;
        }
        res.status(500).json({ err: err_message });
    }
});

router.get('/', async (req, res) => {
    try {
        const allParticipant = await db.participant.all();
        res.json(allParticipant);
    } catch (err: unknown) {
        console.log(err);
        let err_message = "";
        if (err instanceof Error) {
            err_message = err.message;
        }
        res.status(500).json({ err: err_message });
    }
});

router.post('/', async (req, res) => {
    const newUser = req.body;
    try {
        const result = await db.participant.insert(
            newUser.Is18, 
            newUser.IsHearing,
            newUser.ListeningDevice,
            newUser.IsQuietEnv
        );
        res.json(result);
    } catch (err) {
        console.log(err);
        let err_message = "";
        if (err instanceof Error) {
            err_message = err.message;
        }
        res.status(500).json({ err: err_message });
    }
});

export default router;