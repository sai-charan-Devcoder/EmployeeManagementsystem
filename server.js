import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./Middleware/errorHandler";
const app=express();
import routes from './routes';


//database connection
mongoose.connect(DB_URL,{useNewUrlParser:true, 
    useUnifiedTopology:true});

const db=mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));

db.once('open',()=>{
   console.log('Db connected...');
});

app.use(express.json());

//registering all routes 
app.use('/api',routes);

app.use(errorHandler);

app.listen(APP_PORT,
            ()=>console.log(`Listening on Port ${APP_PORT}`));