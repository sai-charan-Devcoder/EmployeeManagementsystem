import { string } from "joi";
import mongoose from "mongoose";

//schema for document
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:'customer'},
},{timestamps:true});

export default mongoose.model('User',userSchema,'users');

