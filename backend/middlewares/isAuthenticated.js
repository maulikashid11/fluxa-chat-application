import jwt from "jsonwebtoken";

export const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.cookies.token;

        if(!token){
            return res.json({success:false,message:"Something went wrong!"});
        }

        const decoded = await jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}