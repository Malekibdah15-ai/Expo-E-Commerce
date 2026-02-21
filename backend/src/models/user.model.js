import mongoose from "mongoose";

const addresSchema = new mongoose.Schema({
    label:{
        type: String,
        required: true,
    },
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
    default:{
        type: Boolean,
        default: false,
    }

})

const userSchema = new mongoose.Schema({
    email:{
        type: String,   
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    clerkId:{
        type: String,
        required: true,
        unique: true,   
    },
    addreses:[addresSchema],
    wishList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }
    ],
   },
   {    timestamps: true,}
);

export const User = mongoose.model("User", userSchema);