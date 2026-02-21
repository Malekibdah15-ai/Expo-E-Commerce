import express from 'express';
import path from 'path';
import { ENV } from './config/env.js';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest,functions } from './config/inggest.js';
import adminRoutes from './routes/admin.model.js';
import userRoutes from './routes/user.model.js'
import orderRoutes from './routes/order.model.js'
const app = express();

const __dirname = path.resolve();
app.get('/api/data', (req, res) =>{
    res.json({ message: 'Hello from the backend!' });
})

app.use(express.json());
app.use(clerkMiddleware());
app.use("/api/inngest", serve({client: inngest, functions: functions}));


// deployment
if(ENV.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../admin/dist'))); 
    app.get('/{*any}', (req, res) => {
        res.sendFile(path.join(__dirname, '../admin/dist/index.html'));
    }); 
}
app.use("/api/admin",adminRoutes);
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
  connectDB();
});
