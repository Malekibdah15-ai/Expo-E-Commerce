import cloudinary from '../config/cloudinary.js';
import { Product } from '../models/product.js';
import { Order } from '../models/order.model.js';
import { User } from '../models/user.model.js';

export async function createProduct(req, res) {
    try{
        const {name, description, price, category, stock} = req.body;
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({message: "All fields are required"});
        }
        if(!req.files || req.files.length === 0){
            return res.status(400).json({message: "At least one image is required"});
        }
        if (req.files.length > 3){
            return res.status(400).json({message: "Maximum 3 images allowed"});
        }
        const uploadPromises = req.files.map(file => {
            return cloudinary.uploader.upload(file.path, {
                folder: "products",
        })
    })
        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map(result => result.secure_url);
        const product = await Product.create({
            name,
            description,
            price: parseFloat(price),
            category,
            stock: parseInt(stock),
            images: imageUrls,
        })
        res.status(201).json(product);
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export async function getAllProducts(_, res) {
  try {
    // -1 means in desc order: most recent products first
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateProduct(req, res) {
    try{
        const {id} = req.params;
        const {name, description, price, category, stock} = req.body;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }   
        if(name) product.name = name;
        if(description) product.description = description;
        if(price) product.price = parseFloat(price);
        if(category) product.category = category;
        if(stock) product.stock = parseInt(stock);
        if(req.files && req.files.length > 0){
            if(req.files.length > 3){
                return res.status(400).json({message: "Maximum 3 images allowed"});
            }
            const uploadPromises = req.files.map(file => {
                return cloudinary.uploader.upload(file.path, {
                    folder: "products",
                })
            }
            )
            const uploadResults = await Promise.all(uploadPromises);
            product.imageUrl = uploadResults.map(result => result.secure_url);
        }   
        await product.save();
        res.status(200).json(product);
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }   
}

export async function getAllOrders(req, res) {
    try{
        const orders = await Order.find()
            .populate("userId", "name email")
            .populate("products.productId")
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }       
}
export async function updateOrderStatus(req, res) {
    try{
        const {id} = req.params;
        const {status} = req.body;
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        order.status = status;
        if(status === "Shipped" && !order.shippedAt){
            order.shippedAt = new Date();
        }
        if(status === "Delivered" && !order.deliveredAt){
            order.deliveredAt = new Date();
        }
        await order.save();
        res.status(200).json(order); 
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }   
}

export async function getAllCustomers(req, res) {
    try{
        const customers = await User.find().sort({ createdAt: -1 })                                                                         ;
        res.status(200).json(customers);
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }   
}

export async function getDashboardStatus(req, res) {
    try{
        const totalOrders = await Order.countDocuments();
        const revenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalPrice" }  
                }
            }
        ]);
        const totalRevenue = revenueResult[0]?.total || 0;
        const totalCoustomers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        res.status(200).json({
            totalOrders,
            totalRevenue,   
            totalCoustomers,
            totalProducts,
        });
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }   
}

export async function deleteProduct(req, res){
    try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((imageUrl) => {
        // Extract public_id from URL (assumes format: .../products/publicId.ext)
        const publicId = "products/" + imageUrl.split("/products/")[1]?.split(".")[0];
        if (publicId) return cloudinary.uploader.destroy(publicId);
      });
      await Promise.all(deletePromises.filter(Boolean));
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
}
