import { tripController } from "./controllers/trip.controller";


class TripRoutes{
  constructor(private tripRouter:any){
      this.tripRouter = tripRouter;
       this.registertripRoutes();
  }

  registertripRoutes(){

    this.tripRouter.post(
      '/register',
      tripController.register
    )
  }
}

const tripRoutes = (tripRouter:any)=>{
  return new TripRoutes(tripRouter);
};

export = {
  tripRoutes,
  TripRoutes,
};