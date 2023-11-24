import { Request, Response, NextFunction } from 'express';
import { Trip } from '../../../models/Trip/trip'
import { Car } from '../../../models/Car/car'
import stringConstants from '../../../common/stringConstants';

class TripController {
  async register(req: any, res: any, next: any) {
    try {
      const { destination, distance, carId } = req.body;

      
      const newTrip = await Trip.create({
        destination,
        distance,
        carId,
      });

      res.locals.response = {
        body: {
            data: {
                trip: {

                    model: newTrip.dataValues.destination,
                    price: newTrip.dataValues.distance,
                    carId: newTrip.dataValues.carId,
                },
            },
        },
        message: stringConstants.userControllerMessage.REGISTERED,
    };
        next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

 const tripController = new TripController();
 export {tripController};
