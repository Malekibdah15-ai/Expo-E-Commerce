import express from 'express';
import path from 'path';
import { ENV } from './config/env.js';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
const app = express();

const __dirname = path.resolve();
app.get('/api/data', (req, res) =>{
    res.json({ message: 'Hello from the backend!' });
})

app.use(clerkMiddleware());
// deployment
if(ENV.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../admin/dist'))); 
    app.get('/{*any}', (req, res) => {
        res.sendFile(path.join(__dirname, '../admin/dist/index.html'));
    }); 
}

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
  connectDB();
});
