import * as express from 'express';
import db from '../../db';

const router = express.Router();

router.get('/:soundfile_id', async (req, res) => {
    const soundfile_id = req.params.soundfile_id;
    try {
        const soundfile = await db.soundfile.one(soundfile_id);
        res.json(soundfile);
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
        const allSoundfile = await db.soundfile.all();
        res.json(allSoundfile);
    } catch (err: unknown) {
        console.log(err);
        let err_message = "";
        if (err instanceof Error) {
            err_message = err.message;
        }
        res.status(500).json({ err: err_message });
    }
});

router.put('/:soundfile_id', async (req, res) => {
    const soundfile_id = Number(req.params.soundfile_id);
    const editedSoundfile = req.body.TimesSelected;
    try {
        const result = await db.soundfile.update(editedSoundfile, soundfile_id);
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