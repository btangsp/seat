import * as express from 'express';
import db from '../../db';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allQuestion = await db.question.all();
        res.json(allQuestion);
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
    const newQuestion = req.body;
    try {
        const result = await db.question.insert(
            newQuestion.TestGroupID,
            newQuestion.SurveyID,
            newQuestion.OrderAsked
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