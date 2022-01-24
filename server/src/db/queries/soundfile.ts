import { Query } from '..';

const all = () => Query('SELECT * FROM soundfile');
const one = (Filename: string) => Query('SELECT * FROM soundfile WHERE Filename = ?', [Filename]);
const update = (TimesSelected: number, id: number) => Query('UPDATE soundfile SET TimesSelected = ? WHERE id = ?', [TimesSelected, id]);

export default {
    all,
    one,
    update
}