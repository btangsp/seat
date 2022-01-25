import { Query } from '..';

const all = () => Query('SELECT * FROM question');
const insert = (TestGroupID: string, SurveyID: number, OrderAsked: number) => Query('INSERT INTO question (TestGroupID, SurveyID, OrderAsked) VALUES (?, ?, ?)', [TestGroupID, SurveyID, OrderAsked]);

export default {
    all,
    insert
}