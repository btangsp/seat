import express from 'express';
import morgan from 'morgan'; // express middleware for logging incoming requests
import * as path from 'path';
import routes from './server/src/routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.static('./client/build'));
app.use(express.json()); // middleware that parses request bodies coming in
app.use(routes);
// if does not start with API and get matched in app.use(routes), then  this .get() will get caught and we'll assume it's frontend thing
app.get('*', (req, res) => {
	// the file path points here because it actually runs from dist/server.js
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port: ${port}`));