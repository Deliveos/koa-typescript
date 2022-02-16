require('dotenv').config();
import Koa from 'koa';
import router from './routes';
import { config } from './config/env.config';
import { connectDB } from './config/db.config';
import  bodyParser from 'koa-bodyparser';

// REQUIRES

// APPS
const app = new Koa();

// DATABASE
connectDB();

// USES
app.use(bodyParser());
app.use(router.routes());

// APP START
app.listen(config.PORT, () => {
  console.log(`Server has been started on port ${config.PORT}`);
});