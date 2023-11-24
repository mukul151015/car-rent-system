import createError from 'http-errors';

class ValidateCarApis {
  async validateCarRequest(req: any, res: any, next: any) {
    try {
      const {  model, price} = req.body;
      if ( !model || !price ) {
        throw createError(400, 'Required parameters are missing');
      }

      next();
    } catch (err) {
      next(err);
    }
  }

}

const validateCarApis = new ValidateCarApis();
export { validateCarApis };
