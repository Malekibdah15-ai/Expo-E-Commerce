import {Order} from "../models/order.model.js"
import { Product } from "../models/product.js";
import {Review} from "../models/review.model.js"
export async function createReview(req, res) {
    try{
        const{productId, orderId, rating} = req.body
        if(!rating || rating < 1 || rating > 5){
            return res.status(400).json({error: "rating must be between 1 , 5"});
        }
        const user = req.user
        const order = await Order.findById(orderId)
        if(!order){
            return res.status(400).json({error: "order not found"});
        }
        if(order.clerkId !== user.orderId){
            return res.status(400).json({error: "not authorized to review this order"});
        }
        if(order.status !== "delivered"){
            return res.status(401).json({error: "can onlt review delivered review orders"});
        }
        const productInOrder = order.orderItems.find(
            (item)=> item.product.toString() === productId.toString()
        );
        if(!productInOrder){
            return res.status(401).json({error: "product not found in this order"});
        }
        const existingReview = await Review.findOne({productId, userId: user._id})
        if(existingReview){
            return res.status(401).json({error: "you have already reviewed this product"});
        }
        const review = await Review.create({
            productId,
            userId: user._id,
            orderId,
            rating

        })
        const product = await Product.findById(productId);
        const reviews = await Review.find({productId});
        const totalRating = reviews.reduse((sum, rev) => sum + rev.rating, 0);
        product.averageRating = totalRating / reviews.lengthl
        product.totalReviews = reviews.length;
        await product.save()

        res.status(201).json({message: "review succissfuly created ", review})

    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// export async function deleteReview(req, res) {
//     try{

//     }catch(error){
        
//     }
// }