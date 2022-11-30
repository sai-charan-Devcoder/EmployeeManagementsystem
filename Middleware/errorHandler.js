
import { DEBUG_MODE } from "../config";
import { ValidationError } from "joi";
import customErrorHandler from "../services/CustomErrorHandler";
const errorHandler=(err,req,res,next)=>{

    let statusCode=500;
    let data={
        message:'Internal server error',
        ...(DEBUG_MODE=='true'&&{originError:err.message})
     
        // originError:err.message is not good to show in client production
    }
    if(err instanceof ValidationError){
      statusCode=422;
      data={
          message:err.message
      }
    }
    if(err instanceof customErrorHandler){
     statusCode=err.status;
     data={
         message:err.message
     }
    }
    
    return res.status(statusCode).json(data);

}

 

export default errorHandler;