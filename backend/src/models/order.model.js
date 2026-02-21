import mongoose from 'mongoose';

const shippingAddressSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    streatAddress:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{ 
        type: String,
        required: true,
    },
    zipCode:{
        type: String,   
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
})


const orderItemSchema = new mongoose.Schema({
    productID:{
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'Product',
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    imageUrl:{
        type: String,
        required: true,
    },

})

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    clerkId:{
        type: String,
        required: true,
        unique: true,
    },
    orderItems:[orderItemSchema],
    shippingAddress:{
        type: shippingAddressSchema,
        required: true,
    },
    paymentMethod:{
        id: String,
        status: String,
    },
    totalPrice:{
        type: Number,
        required: true,
        min: 0,
    },
    status:{
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending',
    },
    deliveredAt:{
        type: Date,
    },
    shippedAt: {
        type: Date,
    }


}, {timestamps: true})

export const Order = mongoose.model("Order", orderSchema)