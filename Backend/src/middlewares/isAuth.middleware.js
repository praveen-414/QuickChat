import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(409).json({
        message: "Token not found...!",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
   
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
  }
};


export default isAuth;