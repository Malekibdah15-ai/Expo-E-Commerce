import { Product } from '../models/product.js';
export async function getProduct(req, res) {
    try{
        const {id} = req.params
        const product = await Product.findById(id)
        if(!product){
            return res.status(200).json({err: "no products found"})
        }
        res.status(200).json(product)
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}