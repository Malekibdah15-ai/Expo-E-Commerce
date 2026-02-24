import { Product } from "../models/product.js";
import { Order } from "../models/order.model.js";
import {Review} from "../models/review.model.js"
export async function createOrder(req, res) {
    try{
        const user = req.user
        const{orderItems,shippingAddress,paymentMethod,totalPrice,} = req.body
        if(!orderItems || orderItems.length === 0){
            return res.status(200).json({message: "no order items"})
        }
        for(const item of orderItems){
            const product = await Product.findById(item.product._id);
            if(!product){
                return res.status(200).json({error: `product ${item.name} not found`})
            }
            if(product.stock < item.quantity){
                return res.status(200).json({error: `unsificiant funds for ${product.name}`})
            }
        }
        const order = await Order.create({
            user : user._id,
            clerkId: user.clerkId,
            shippingAddress,
            paymentMethod,
            totalPrice
        })
        for(const item of orderItems){
            await Product.findByIdAndUpdate(item.product._id,{
                $inc: {stock: -item.quantity}
            })
        }
        res.status(201).json({message: "order added successfully", order})
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export async function getUserOrder(req, res) {
    try{
        const orders = await Order.find({clerkId: req.user.clerkId}).populate("orderItems.product")
        
        const orderReviewStatus = await Promise.all(
            orders.map(async (order)=>{
                const review = await Review.findOne({orderId:order._id })
                return{
                    ...order.toObject(),
                    hasReviewed: !!review
                }
            })
        )

        res.status(201).json({orders: orderReviewStatus})
    }catch(error)
    {
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }
    
}