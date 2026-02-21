import {Inngest} from 'inngest';
import connectDb from './db.js';
import {User} from '../models/user.model.js';



export const inngest = new Inngest(
    {id: "ecommerce-app",
    signingKey: process.env.INNGEST_SIGNING_KEY
    }

);

const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async ({event}) =>{
        await connectDb();
        const {emailAddresses, firstName, lastName, imageUrl, id} = event.data;
        const newUser = {
            email: emailAddresses[0]?.emailAddress,
            name: `${firstName} ${lastName}`,
            imageUrl: imageUrl,
            clerkId: id,
            addreses: [],
            wishList: [],

        }
        await User.create(newUser);
    }
)

const deleteUserFromDb = inngest.createFunction(
    {id: "delete-user"},
    {event: "clerk/user.deleted"},
    async ({event}) =>{
        await connectDb();
        const {id} = event.data;
        await User.deleteOne({clerkId: id});
    }
)

export const functions = [syncUser, deleteUserFromDb];