import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    productID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },  
    orderID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',   
        required: true,
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5, 
    },

}, {timestamps: true});

export const Review = mongoose.model("Review", reviewSchema);