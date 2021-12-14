import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import('./core/db');
import { UserCtrl } from './controllers/UserController';
import { NewsCtrl } from './controllers/NewsController';
import { registerValidations } from './validations/register';

const port = process.env.PORT || 8080

const app = express();

app.use(cors({
  origin: 'https://economist-news.herokuapp.com',
  credentials: true
}));

app.use(express.json());

app.post('/auth/register', registerValidations, UserCtrl.create);
app.post('/auth/login',  UserCtrl.login);
app.get('/news/single', NewsCtrl.fetchSingleNews)
app.get('/news', NewsCtrl.fetchNews)

app.listen(port, () => {
  console.log(`server startet on ${port} port`);
});
