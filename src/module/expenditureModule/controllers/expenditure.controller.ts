import stringConstants from '../../../common/stringConstants';
import { Expenditure } from '../../../models/Expenditure/expenditure';

class ExpenditureController {
  async add(req: any, res: any, next:any) {
    try {
      const { tripId, amount } = req.body;
      const newExpenditure = await Expenditure.create({
        tripId,
        amount,
      });

      res.locals.response = {
        body: {
            data: {
                expenditure: {

                    model: newExpenditure.dataValues.amount,
                    price: newExpenditure.dataValues.amount,
                },
            },
        },
        message: stringConstants.userControllerMessage.REGISTERED,
    };
        next();


    } catch (error) {
      next(error);
    }
  }
}

const expenditureController = new ExpenditureController();
export { expenditureController };
