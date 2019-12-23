import express from 'express';
import router from './routes';

const app = express();

app.listen(8080);
app.use(express.json());
app.use('/', router);
