import { carController } from "./controllers/car.controller";
import { validateCarApis } from "./policies/car.policies";
import  {verifyClient}  from "../../services/common/requestResponseHandler";

class CarRoutes{
    constructor(private carRouter:any){
        this.carRouter = carRouter;
        this.registercarRoutes();
    }

    registercarRoutes(){

        this.carRouter.post(
            '/register',
            verifyClient.bind(verifyClient),
            validateCarApis.validateCarRequest.bind(validateCarApis),
            carController.register
        )
     

        this.carRouter.get(
            '/findAll',
            carController.findAll
        )

       this.carRouter.get(
        '/findByUserId',
        verifyClient.bind(verifyClient),
        carController.findByUserId
       )

       this.carRouter.delete(
        '/deleteByCarId/:carId',
        carController.deleteByCarId
       )
    }

}


 const carRoutes = (carRouter:any)=>{
    return new CarRoutes(carRouter);
 };

  export = {
    carRoutes,
    CarRoutes,
  };