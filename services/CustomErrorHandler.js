class customErrorHandler extends Error{
    constructor(status,msg){
    super();
    this.status=status,
    this.message=msg;
    }
    
    static alreadyExist(message){
     return new customErrorHandler(409,message);
    }

    static wrongCredentials(message='username or password is wrong'){
   return new customErrorHandler(401,message);
    }
}
    export default customErrorHandler;