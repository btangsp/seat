import * as express from 'express';
import db from '../../db';

const router = express.Router();

router.get('/:survey_id', async (req, res) => {
    const survey_id = Number(req.params.survey_id);
    try {
        const survey = await db.survey.one(survey_id);
        res.json(survey);
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
        const allSurvey = await db.survey.all();
        res.json(allSurvey);
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
    const newSurvey = req.body;
    try {
        const result = await db.survey.insert(
            newSurvey.participant_id
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