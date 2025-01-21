import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import database from './db/database.js'
import teamsRoutes from './routes/teamRoutes.js';
import sportTeams from './routes/sportTeamsRoutes.js'
import { EventEmitter } from 'events';

dotenv.config();

const app = express();
const port = process.env.PORT;

EventEmitter.defaultMaxListeners = 30;
app.use(express.json());
app.use(morgan('combined'));

app.use('/teams',teamsRoutes);
app.use('/sportTeams',sportTeams);

//MIDDLEWARE FOR ROUTE NOT FOUND
app.use((req,res,next) =>{
    res.status(404).json({
        message: 'Route not found',
    });
});

app.use((err,req,res,next) =>{
    res.status(err.status || 500).json({
        message: err.message,
    });
});

database.sync().then(() => {
    app.listen(port, () =>{
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) =>{
    console.log(err);
});



