import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import actions from './actions.js';


const app = express();

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