import { authController } from "./controllers/auth.controller";
import { validateUserApis } from "./policies/auth.policies";


class AuthRoutes{
    constructor(private authRouter:any){
        this.authRouter = authRouter;
        this.registerRoutes();
    }

    registerRoutes(){

        this.authRouter.post(
            '/register',
           validateUserApis.validateRegisterRequest.bind(validateUserApis),
            authController.register
          );


          this.authRouter.post(
            '/authenticate',
            validateUserApis.validateLoginRequest.bind(validateUserApis),
            authController.login
          );


    }




}

const authRoutes = (authRouter: any) => {
    return new AuthRoutes(authRouter);
  };
  
  export = {
    AuthRoutes,
    authRoutes,
  };