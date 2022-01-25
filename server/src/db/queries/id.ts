import { Query } from '..';

const id = () => Query('SELECT LAST_INSERT_ID()');

export default {
    id
}