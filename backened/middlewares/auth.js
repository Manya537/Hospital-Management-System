import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

//Middle ware to authenticate Dashboard User
export const isAdminAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token =
  req.cookies.adminToken ||
  req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(
        new ErrorHandler("Dashboard User is not authenticated!", 400)
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
  }
);

export const isPatientAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Patient Not Authenticated!",400));

    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);
    if(req.user.role !=="Patient"){
        return next(
            new ErrorHandler(
                `${req.user.role} not authorized for this resources!`, 403  //-> forbidden status code if patient want to make add new admin then this message will be displayed Only Admin can do this 
            )
        );
    }
    next();
})