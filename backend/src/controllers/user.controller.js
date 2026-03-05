import {User} from "../models/user.model.js"

export async function addAddreses(req, res) {
    try{
        const {label,fullName,streatAddress,city,state,zipCode,phoneNumber,isDefault} = req.body

        const user = req.user
        if(isDefault){
            user.addresses.forEach((addre) =>{
                addre.isDefault = false
            })
        }
        user.addreses.push({
            label,
            fullName,
            streatAddress,
            city,
            state,
            zipCode,
            phoneNumber,
            isDefault: isDefault || false
        })
        await user.save()

        res.status(201).json({message: "addres added sucsufully", addreses: user.addresses})
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
export async function getAddreses(req, res) {
    try{
        const user = req.user
        res.status(200).json( {addreses: user.addresses})

    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }
    
}
export async function updateAddreses(req, res) {
    try{
         const {label,fullName,streatAddress,city,state,zipCode,phoneNumber, isDefault} = req.body
         const {id} = req.params
         const user = req.user
         const address = user.addresses.id(id)
         if(!address){
            return res.status(404).json({message: "Internal server error"});
         }
            if(isDefault){
            user.addresses.forEach((addre) =>{
                addre.isDefault = false
            })
        }
        address.label = label || address.label
        address.fullName = fullName|| address.fullName
        address.streatAddress = streatAddress || address.streatAddress
        address.city = city || address.city
        address.state = state || address.state
        address.zipCode =  zipCode || address.zipCode
        address.phoneNumber = phoneNumber || address.phoneNumber
        address.isDefault = isDefault !== undefined ? isDefault : address.isDefault

        await user.save()
        res.status(200).json({message: "addresses added sucsufully"})

    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }
    
}
export async function deleteAddreses(req, res) {
    try{
        const {id} = req.params
        const user = req.user
        user.addresses.pull(id)
        await user.save()
        res.status(201).json({message: "address deleted sucsufully", addreses: user.addresses})
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export async function addToWishlist(req, res) {
    try{
        const {productId} = req.body
        const user = req.user
        if(user.wishlist.includes(productId)){
            return res.status(500).json({message: "product already in the wishlist"});
        }
        user.wishlist.push(productId)
        await user.save()
        res.status(200).json({message: "product added sucsufully", wishlist: user.wishList})
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Internal server error"});
    }
    
}

export async function deleteFromWishlist(req, res) {
    try{
        const {productId} = req.params
        const user = req.user
        if(user.wishlist.includes(productId)){
            return res.status(500).json({message: "product already in the wishlist"});
        }
        user.wishlist.pull(productId)
        await user.save()
        res.status(200).json({message: "product deleted sucsufully", wishlist: user.wishList})
    }catch(error){
        return res.status(500).json({message: "Internal server error"});
    }
        
}

export async function getWishlist(req, res) {
  try {
    // we're using populate, bc wishlist is just an array of product ids
    const user = await User.findById(req.user._id).populate("wishlist");

    res.status(200).json({ wishlist: user.wishList });
  } catch (error) {
    console.error("Error in getWishlist controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}