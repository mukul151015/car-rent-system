

class TripRoutes{
    constructor(private tripRouter:any){
        this.tripRouter = tripRouter;
         this.registertripRoutes();
    }

    registertripRoutes(){

    }
}

const tripRoutes = (tripRouter:any)=>{
    return new TripRoutes(tripRouter);
 };

  export = {
    tripRoutes,
    TripRoutes,
  };