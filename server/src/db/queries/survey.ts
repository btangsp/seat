import { Query } from '..';

const all = () => Query('SELECT * FROM survey');
const one = (id: number) => Query('SELECT * FROM survey WHERE id = ?', [id]);
const insert = (participant_id: number) => Query('INSERT INTO survey (ParticipantID) VALUES (?)', participant_id);

export default {
    all,
    one,
    insert
}