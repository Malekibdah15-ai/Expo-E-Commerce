import { requireAuth } from '@clerk/express';
import { User } from '../models/user.model.js';
import { ENV } from '../config/env.js';

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    console.log("protectRoute: req.user =", req.user);
    try {
      const clerkId = req.auth.userId; // ✅ get userId properly
      if (!clerkId) return res.status(401).json({ message: "Unauthorized" });

      const user = await User.findOne({ clerkId }); // ✅ use object filter
      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user;
      next();
    } catch (error) {
      console.error("Error fetching user in protectRoute:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];

export const adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized-No user found" });

  if (req.user.email !== ENV.ADMIN_EMAIL) { // Make sure your env variable is spelled correctly
    return res.status(403).json({ message: "Forbidden-Admin access only" });
  }
  next();
};