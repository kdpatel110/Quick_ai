import sql from "../configs/db.js";

export const getUserCreations = async (req, res)=> {
    try {
        const {userId} = req.auth ? await req.auth() : { userId: req.userId };

        const creations = await sql`SELECT * FROM creation WHERE user_id = ${userId} ORDER BY created_at DESC`;
        res.json({ success: true, creations});

    } catch (error) {
        res.json({ success: false, message: error.message});
    }
}

export const getPublishCreations = async (req, res)=> {
    try {

        const creations = await sql`SELECT * FROM creation WHERE publish = true ORDER BY created_at DESC`;
        res.json({ success: true, creations});

    } catch (error) {
        res.json({ success: false, message: error.message});
    }
}

export const toggleLikeCreation = async (req, res)=> {
    try {

        const {userId} = req.auth ? await req.auth() : { userId: req.userId };
        const {id} = req.body;

        const [creation] = await sql `SELECT * FROM creation WHERE id = ${id}`

        if(!creation){
            return res.json({success:false, message: "Creation not found"})
        }

        const currentLikes = creation.likes || [];
        const userIdStr = userId.toString();

        let updatedLiked;
        let message;

        if(currentLikes.includes(userIdStr)){
            updatedLiked = currentLikes.filter((user)=> user !== userIdStr);
            message = 'Creation Unliked'
        }else{
            updatedLiked = [...currentLikes, userIdStr]
            message = 'Creation Liked'
        }

        await sql`UPDATE creation SET likes = ${sql.array(updatedLiked)} WHERE id = ${id}`;

        res.json({success: true, message });

    } catch (error) {
        res.json({ success: false, message: error.message});
    }
}