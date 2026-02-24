import {Cart } from "../models/cart.model.js"
import {Product } from "../models/product.js"
export async function getCart(req, res) {
    try{
        let cart = await Cart.findOne({clerkId: req.user.clerkId}).populate("items.product")
        if(!cart){
            const user = req.user
            cart = await Cart.create({
                user: user._id,
                clerkId: user.clerkId,
                items: []
            })
        }
        res.status(200).json(cart)

    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }
    
}
export async function createCart(req, res) {
    try{
        const {productId, quantity} = req.body

        const product = await Product.findOne({clerkId: req.user.clerkId})
        if(!product){
            return res.status(500).json({error: "product not found"});
        }
        if(product.stock < quantity){
            return res.status(500).json({error: "unsificiant funds"});
        }

        let cart = await Cart.findOne({clerkId: req.user.clerkId})

        if(!cart){
            cart = await Cart.create({
                user: user._id,
                clerkId: user.clerkId,
                items: []
            })
        }
        const existingItem = cart.items.find((item)=> item.productId.toString() === productId)
        if(existingItem){
            const newQuantity = existingItem.quantity + 1
            if(product.stock < quantity){
                return res.status(500).json({error: "unsificiant funds"});
            }
            existingItem.quantity = newQuantity
        }else{
            cart.items.push({product: productId, quantity})
        }
        await cart.save()
        res.status(200).json({message: "cart is added succssufly"}, cart)
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({err: "Internal server error"});
    }   
}
export async function updateCart(req, res) {
    try{
        const {id} = req.params
        const {quantity} = req.body

        if(quantity < 1){
            return res.status(500).json({error: "quantity must be at least 1"});
        }
        const cart = await Cart.findOne({clerkId: req.user.clerkId})
        if(!cart){
            return res.status(500).json({error: "Cart not found"});
        }
        const itemIndex = await cart.items.findIndex((item)=> item.productId.toString() === id)
        if(itemIndex === -1){
            return res.status(500).json({error: "Item not found"});
        }
        const product = await Product.findById(id)
        if(!product){
            return res.status(500).json({error: "product not found"});
        }
        if(product.stock < quantity){
            return res.status(500).json({error: "unsificiant funds"});
        }
        cart.items[itemIndex].quantity = quantity
        await cart.save()
        res.status(400).json({message: "cart updated successuflly"}, cart)

    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({err: "Internal server error"});
    }   
}
export async function deleteCart(req, res) {
    try{
        const {id} = req.params
        const cart = await Cart.findOne({clerkId: req.user.clerkId})
        if(!cart){
            return res.status(500).json({error: "Cart not found"});
        }
        cart.items = cart.items.filter((item)=> item.productId.toString() !== id)
        await cart.save()
        res.status(401).json({message: "cart items id deleted"}, cart)

    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({err: "Internal server error"});
    }   
}
export async function clearCart(req, res) {
    try{
        const cart = await Cart.findOne({clerkId: req.user.clerkId})
        if(!cart){
            return res.status(500).json({error: "Cart not found"});
        }
        cart.items = []
        await cart.save()
        res.status(401).json({message: "cart cleared"}, cart)

    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({err: "Internal server error"});
    }    
}