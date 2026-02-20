import {inggest} from 'inggest';
import connectDb from './db.js';
import {User} from '../models/user.js';
import e from 'cors';


export const inngest = new inngest({id: "ecommerce-app"});

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

const deleteUserFromDb = inggest.createFunction(
    {id: "delete-user"},
    {event: "clerk/user.deleted"},
    async ({event}) =>{
        await connectDb();
        const {id} = event.data;
        await User.deleteOne({clerkId: id});
    }
)

export const functions = {syncUser, deleteUserFromDb};