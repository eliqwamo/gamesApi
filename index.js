import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import actions from './actions.js';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const port = process.env.PORT;

app.use('/api', actions);

mongoose.connect(process.env.MONGO_URL)
.then(results => {
    app.listen(port, () => {
        console.log(`Server is running via port ${port}`);
    })
})
.catch(error => {
    console.log(error.message);
})