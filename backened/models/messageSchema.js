import mongoose from "mongoose";
import validator from "validator";

const messageSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength: [3, "First Nmae must Contain at least 3 characters!"]

    },
    lastName:{
        type: String,
        required: true,
        minLength: [3,"Last Name Must contain at least 3 characters!"]

    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide a Valid Email"]
    },
    phone:{
        type: String,
        required: true,
        minLength:[10, "Phone Number Must Contain Exact 10 Digits!"],
        minLength:[10, "Phone Number Must Contain Exact 10 Digits!"],
    },
    message:{
        type: String,
        required: true,
        minLength:[10, "Message Must Contain At least 10 Charcters!"],
    },
});

export const Message=mongoose.model("Message",messageSchema);