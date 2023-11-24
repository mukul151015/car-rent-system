import stringConstants from '../../../common/stringConstants';
import {Car} from '../../../models/Car/car';
import { v4 as uuidv4 } from 'uuid';


class CarController {

    async register(req: any, res: any, next: any) {
        try {
            const { model, price } = req.body;
            const userId = res.user.userId;
    
            const newCar = await Car.create({
                model,
                price,
                userId,
            });
    
            res.locals.response = {
                body: {
                    data: {
                        car: {

                            model: newCar.dataValues.model,
                            price: newCar.dataValues.price,
                            userId: newCar.dataValues.userId,
                        },
                    },
                },
                message: stringConstants.userControllerMessage.REGISTERED,
            };
    
            next();
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
    async findAll(req: any, res: any, next: any) {
        try {
            const allCars = await Car.findAll({
                attributes: ['carId', 'model', 'price', 'userId'],
            });

            res.locals.response = {
                body: {
                    data: {
                        cars: allCars.map((car: any) => ({
                            carId: car.dataValues.carId,
                            model: car.dataValues.model,
                            price: car.dataValues.price,
                            userId: car.dataValues.userId,
                        })),
                    },
                },
                message: "All Cars data here",
            };

            next();
        } catch (err) {
            next(err);
        }
    }

    async findByUserId(req: any, res: any, next: any) {
        try {
            const userId = res.user.userId;

            const userCars = await Car.findAll({
                attributes: ['carId', 'model', 'price', 'userId'],
                where: {
                    userId: userId,
                },
            });

            res.locals.response = {
                body: {
                    data: {
                        cars: userCars.map((car: any) => ({
                            carId: car.dataValues.carId,
                            model: car.dataValues.model,
                            price: car.dataValues.price,
                            userId: car.dataValues.userId,
                        })),
                    },
                },
                message: "Cars for the specified user ID",
            };

            next();
        } catch (err) {
            next(err);
        }
    }

    async deleteByCarId(req: any, res: any, next: any) {
        try {
            const carId = req.params.carId; // Assuming the car ID is in the request parameters

            const deletedCar = await Car.destroy({
                where: {
                    carId: carId,
                },
            });

            if (deletedCar > 0) {
                res.locals.response = {
                    body: {
                        data: {
                            message: "Car deleted successfully",
                        },
                    },
                    message: "Car deleted successfully",
                };
            } else {
                res.locals.response = {
                    body: {
                        data: {
                            message: "Car not found",
                        },
                    },
                    message: "Car not found",
                };
            }

            next();
        } catch (err) {
            next(err);
        }
    }

}

  
  const carController = new CarController();
  export { carController };

    
  