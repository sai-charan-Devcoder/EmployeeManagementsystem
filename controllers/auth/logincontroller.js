
import Joi from 'joi';
import { User } from '../../models';
import customErrorHandler from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
const loginController={
     async login(req,res,next){
      
        // validation schema
        const loginSchema=Joi.object({
           email:Joi.string().email().required(),
           password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
        const {error}=loginSchema.validate(req.body);

        if(error){
            return next(error);
        }

        try{
        const user=await User.find({email:req.body.email});
        if(!user){
            return next(customErrorHandler.wrongCredentials());
         }
         //If user exists campare password
         const match=await bcrypt.compare(req.body.password,user.password);
         if(!match){
           return next(customErrorHandler.wrongCredentials());
         }

         const access_token=JwtService.sign({_id:user._id,role:user.role});
       
         res.json({access_token});
        }catch(err){
          return next(err);
        }
        
     }
   
    

};
export default loginController;
