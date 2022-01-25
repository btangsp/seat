import * as express from 'express';
import participantRouter from './participant';
import surveyRouter from './survey';
import soundfileRouter from './soundfile';
import questionRouter from './question';
import responseRouter from './response';
import idRouter from './id';

const router = express.Router();

router.use('/participant', participantRouter);
router.use('/survey', surveyRouter);
router.use('/soundfile', soundfileRouter);
router.use('/question', questionRouter);
router.use('/response', responseRouter);
router.use('/id', idRouter);

export default router;