import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes'
import { errors } from 'celebrate';
import jwt from 'express-jwt';
// Local
import authConfig from './config/auth.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use(jwt(authConfig).unless({path: ['/authenticate', '/register']}));
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(errors());

app.listen(3333);