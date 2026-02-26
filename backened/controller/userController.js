import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User }  from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import { uploadFile } from "../utils/imagekit.js";
import fs from "fs";


export const patientRegister=catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic

    }=req.body;
    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic 

    ){
        return next(new ErrorHandler("PLease Fill the full Form!",400));
    }

    let user=await User.findOne({ email });  //let is used for reassigning the user updation occured
    if(user){
        return next(new ErrorHandler("User Already Registered!",400));

    }

    user=await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role: "Patient"

    });

    generateToken(user,"User Registered!",200,res);

})

export const login=catchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role}=req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Provide All Details", 400));
    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password Do not Match!",400));
    }

    const user=await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Password or Email",400));
    }

    const isPasswordMatched =await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password Or Email", 400));
    }
    if(role!==user.role){
        return next(new ErrorHandler("User with This Role Not Found!", 400));
    }

    generateToken(user,"User LoggedIn Successfully!",200,res);
    });

export const addNewAdmin= catchAsyncErrors(async(req,res,next)=>{
        const {
        firstName,lastName,email,phone,password,gender,dob,nic}=req.body;
    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic 

    ){
        return next(new ErrorHandler("Please Fill Ful Form",400));

    }

    const isRegistered=await User.findOne( { email });
    


    if(isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`));
    }

    const admin= await User.create({
        firstName,lastName,email,phone,password,gender,dob,nic,role: "Admin"
        
    });
    res.status(200).json({
        success: true,
        message:"New Admin Registered"
    })

});

export const getAllDoctors=catchAsyncErrors(async( req,res,next) =>{
    const doctors= await User.find({role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors,
    })
})

export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("adminToken", "", {
            httpOnly: true,
            expires: new Date(0),   // ✅ this clears cookie
        })
        .json({
            success: true,
            message: "Admin Logged Out Successfully!"
        });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("patientToken", "", {
            httpOnly: true,
            expires: new Date(0),   // ✅ clear cookie
        })
        .json({
            success: true,
            message: "Patient Logged Out Successfully!"
        });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }

    const { docAvatar } = req.files;

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }

    const {
        firstName, lastName, email, phone,
        nic, dob, gender, password, doctorDepartment,
    } = req.body;

    if (
        !firstName || !lastName || !email || !phone ||
        !nic || !dob || !gender || !password || !doctorDepartment
    ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(
            new ErrorHandler("Doctor With This Email Already Exists!", 400)
        );
    }

    // ✅ Read file and upload to ImageKit
    let imagekitResponse;
    try {
        // Read the temp file as base64
        const fileBuffer = fs.readFileSync(docAvatar.tempFilePath);
        const base64File = fileBuffer.toString("base64");

        imagekitResponse = await uploadFile(base64File);
        console.log(imagekitResponse);

        console.log("✅ ImageKit Upload Success:", imagekitResponse.url);
    } catch (error) {
        console.error("❌ ImageKit Upload Error:", error.message);
        return next(
            new ErrorHandler(`ImageKit Upload Failed: ${error.message}`, 500)
        );
    }

    const doctor = await User.create({
        firstName, lastName, email, phone,
        nic, dob, gender, password,
        role: "Doctor",
        doctorDepartment,
        docAvatar: {
            public_id: imagekitResponse.fileId,
            url: imagekitResponse.url,
        },
    });

    res.status(200).json({
        success: true,
        message: "New Doctor Registered",
        doctor,
    });
});