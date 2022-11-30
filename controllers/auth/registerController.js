import Joi from 'joi';
import customErrorHandler from '../../services/CustomErrorHandler';
import { User } from '../../models';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';




const registerController={
    async register(req,res,next){
  //logic


  //validation
  //registration schema
  const registerSchema=Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeat_password:Joi.ref('password')
  });

 
  const {error}=registerSchema.validate(req.body);
   
  if(error){
    return next(error);
  }

  //check if the user is in the database
  try{
    const exist=await User.exists({email:req.body.email});
    if(exist){
      return next(customErrorHandler.alreadyExist('This Email is already Exists'));
    }
  }
  catch(err){
     return next(err);
  }
  const {name,email,password}=req.body;
  //Hash password
  const hashedPassword=await bcrypt.hash(password,10);
  //prepare model
 
  const user=new User({
    name,
    email,
    password:hashedPassword
  });

  let access_token;

  try{
   const result=await user.save();
    
   console.log(result);
      //Token 
    const access_token=JwtService.sign({_id:result._id,role:result.role});


  }
  catch(err){
    return next(err);
  }

  res.json({access_token:access_token});
    }
}


export default registerController;