import { Query } from '..';

const all = () => Query('SELECT * FROM response');
const insert = (SoundFileID: number, SurveyID: number, OrderAsked: number) => Query('INSERT INTO response (SoundFileID, SurveyID, OrderAsked) VALUES (?, ?, ?)', [SoundFileID, SurveyID, OrderAsked]);

export default {
    all,
    insert
}