
//Middelware to check userId and hasPremiumPlan?

import { getAuth, clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const authData = getAuth(req);

    const userId = authData?.userId;
    const sessionId = authData?.sessionId;
    const sessionClaims = authData?.sessionClaims;

    if (!userId || !sessionId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.userId = userId;

    // ⭐ PREMIUM CHECK (REAL ONE BASED ON YOUR TOKEN)
    const isPremium = sessionClaims?.pla === "u:premium";

    // Load free usage
    const user = await clerkClient.users.getUser(userId);
    const freeUsage = Number(user?.privateMetadata?.free_usage) || 0;

    if (isPremium) {
      req.plan = "premium";
      req.free_usage = Infinity;
    } else {
      req.plan = "free";
      req.free_usage = freeUsage;
    }

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};





//req, res, next ARE NOT MAGIC They are built-in parameters provided by Express.js when you define a middleware or a route handler.
// export const auth = async (req, res, next) => {
//     try {
//         const authData = getAuth(req) // clerk-provided helper
//         const userId = authData?.userId;
//         const has = authData?.has;

//         if (!userId) {
//             return res.status(401).json({ success: false, message: 'Unauthorized' });
//         }

//         req.userId = userId;

//         const hasPremiumPlan = typeof has === 'function' ? await has({ plan: 'premium' }) : false;

//         const user = await clerkClient.users.getUser(userId);

//         // Defensive reads
//         const freeUsageFromMeta = user?.privateMetadata?.free_usage;
//         const freeUsage = typeof freeUsageFromMeta === 'number' ? freeUsageFromMeta : Number(freeUsageFromMeta) || 0;

//         if (!hasPremiumPlan) {
//             // free user — keep value from metadata (default 0)
//             req.free_usage = freeUsage;
//             req.plan = 'free';
//         } else {
//             // premium user — unlimited
//             req.free_usage = Infinity;
//             req.plan = 'premium';
//         }

//         return next();
//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message });
//     }

    //     try {
    //     const { userId, has } = await req.auth();
    //     const hasPremiumPlan = await has({ plan: "premium" });
    //     const user = await clerkClient.users.getUser(userId);

    //     let freeUsage = user.privateMetadata.free_usage;

    //     // If user is not premium
    //     if (!hasPremiumPlan) {
    //         // If free usage does not exist, initialize it
    //         if (freeUsage === undefined || freeUsage === null) {
    //             freeUsage = 10; // initial free credits
    //             await clerkClient.users.updateUserMetadata(userId, {
    //                 privateMetadata: {
    //                     free_usage: freeUsage
    //                 }
    //             });
    //         }

    //         req.free_usage = freeUsage;
    //         req.plan = "free";
    //         return next();
    //     }

    //     // If user is premium
    //     req.free_usage = Infinity; // premium unlimited usage
    //     req.plan = "premium";
    //     next();

    // } catch (error) {
    //     res.json({ success: false, message: error.message });
    // }

