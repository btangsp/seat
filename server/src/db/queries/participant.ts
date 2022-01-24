import { Query } from '..';

const all = () => Query('SELECT * FROM participant');
const one = (id: number) => Query('SELECT * FROM participant WHERE id = ?', [id]);
const insert = (Is18: boolean, IsHearing: boolean, ListeningDevice: number, IsQuietEnv: boolean) => Query('INSERT INTO participant (Is18, IsHearing, ListeningDevice, IsQuietEnv) VALUES (?, ?, ?, ?)', [Is18, IsHearing, ListeningDevice, IsQuietEnv]);

export default {
    all,
    one,
    insert
}