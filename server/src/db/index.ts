import * as mysql from 'mysql2';

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DBNAME
})

export const Query = (query: string, values?: any) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) {
                console.log("process.env.MYSQL_HOST:", process.env.MYSQL_HOST);
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

import participant from './queries/participant';
import survey from './queries/survey';
import soundfile from './queries/soundfile';
import question from './queries/question';
import response from './queries/response';
import id from './queries/id';

export default {
    participant,
    survey,
    soundfile,
    question,
    response,
    id
}