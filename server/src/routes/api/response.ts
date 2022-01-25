import * as express from 'express';
import db from '../../db';

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const allResponse = await db.response.all();
        res.json(allResponse);
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
    const newResponse = req.body;
    try {
        const result = await db.response.insert(
            newResponse.SoundFileID,
            newResponse.SurveyID,
            newResponse.OrderAsked
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
})

export default router;