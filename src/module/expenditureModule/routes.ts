import { expenditureController } from "./controllers/expenditure.controller";



class ExpenditureRoutes{
    constructor(private expenditureRouter:any){
        this.expenditureRouter = expenditureRouter;
        this.registerExpenditureRoutes();
    }
     registerExpenditureRoutes(){

         this.expenditureRouter.post(
            '/add',
            expenditureController.add
         )


     }

}


const expenditureRoutes = (expenditureRouter:any)=>{
    return new ExpenditureRoutes(expenditureRouter)
}

export= {
    expenditureRoutes,
    ExpenditureRoutes
}