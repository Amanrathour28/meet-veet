import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { inngest, functions } from './config/inngest.js';
import { serve } from 'inngest/express';

import {clerkMiddleware} from '@clerk/express';

const app = express();
app.use(clerkMiddleware());


app.use(express.json());
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const startServer = async () => {
    try {
        await connectDB();
        if(ENV.NODE_ENV !== 'production'){
            app.listen(ENV.PORT, () => {
                console.log('Server is running on port:', ENV.PORT);
            });
        }   
   } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }       
};


    

startServer();

export default app;

 
