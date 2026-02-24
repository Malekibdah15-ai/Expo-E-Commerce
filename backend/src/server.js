import express from 'express';
import cors from "cors"
import path from 'path';
import { ENV } from './config/env.js';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest,functions } from './config/inggest.js';
import adminRoutes from './routes/admin.model.js';
import userRoutes from './routes/user.model.js'
import orderRoutes from './routes/order.model.js'
import reviewRoutes from './routes/review.model.js'
import productRoutes from './routes/product.model.js'
import cartRoutes from './routes/cart.model.js'

const app = express();


const __dirname = path.resolve();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get('/api/data', (req, res) =>{
    res.json({ message: 'Hello from the backend!' });
})
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});
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
app.use("/api/reviews", reviewRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.listen(ENV.PORT, () => {
  console.log(`Server is running on portddddddd ${ENV.PORT}`);
  connectDB();
});
