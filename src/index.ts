import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata";
import "dotenv/config"
import dotenv from 'dotenv';

// import path from 'path';
import 'express-async-errors';
import cors from 'cors';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/Handler';//
const port = process.env.PORT || 3333
dotenv.config();
const app = express();  

app.use(express.json());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
app.use(routes);
// app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(port,()=>{
  console.info("Executando em ambiente...")
});
