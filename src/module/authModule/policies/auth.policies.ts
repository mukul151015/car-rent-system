import { templateConstants } from '../../../common/templateConstants';
import {
  isNullOrUndefined,
  isEmailValid,
  isValidGuid,
  isStringOnlyContainsNumber,
} from '../../../common/utility';
import { User } from '../../../models/User/user';
import stringConstants from '../../../common/stringConstants';
import { passwordService } from '../../../services/user/passwordService';
//import { otpService } from '../../../services/user/otpService';
import { config } from '../../../config/config';
import { Op } from 'sequelize';
import createError from 'http-errors';
import { validate as isValidUUID } from 'uuid';

class ValidateUserApis {
  async validateLoginRegister(body: any) {
    try {
      const { email, password } = body;
      if (isNullOrUndefined(password)) {
        throw createError(400, templateConstants.PARAMETER_MISSING('password'));
      }
      if (isNullOrUndefined(email)) {
        throw createError(400, templateConstants.PARAMETER_MISSING('email'));
      }
      if (!isEmailValid(email)) {
        throw createError(400, templateConstants.INVALID('email'));
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async validateLoginRequest(req: any, res: any, next: any) {
    try {
      const { email, password} = req.body;
      
      await this.validateLoginRegister(req.body);
      const user = await User.findOne({
        where: {
          email: email.toLowerCase(),
          deletedAt: null,
          isActive: true,
        },
        raw: true,
      });
      if (isNullOrUndefined(user)) {
        throw createError(
          404,
          stringConstants.genericMessage.EMAIL_NOT_REGISTERED
        );
      }
      if (!user.isActive) {
        throw createError(
          400,
          stringConstants.authServiceMessage.ACCOUNT_NOT_ACTIVATED
        );
      }
      await passwordService.verifyPassword(password, user.password);
      res.locals.request = {
        user: user,
      };
      next();
    } catch (err) {
      next(err);
    }
  }
  async validateRegisterRequest(req: any, res: any, next: any) {
    try {
      const { username, email } = req.body;
      await this.validateLoginRegister(req.body);
      if (isNullOrUndefined(username)) {
        throw createError(400, templateConstants.PARAMETER_MISSING('username'));
      }
      const user = await User.findOne({
        where: { email: email.toLowerCase(), deletedAt: null },
        raw: true,
      });
      if (!isNullOrUndefined(user)) {
        throw createError(400, stringConstants.genericMessage.USER_EXISTS);
      }
      next();
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
  async validateForgotPasswordRequest(req: any, res: any, next: any) {
    try {
      let errorMessage = templateConstants.PARAMETER_MISSING('email'),
        isError = false,
        statusCode = 400,
        subCode = 1100;
      if (!req.body.email) {
        isError = true;
      } else if (!isEmailValid(req.body.email)) {
        isError = true;
        errorMessage = templateConstants.INVALID('email');
        statusCode = 400;
        subCode = 1101;
      }
      if (isError) {
        throw createError(statusCode, errorMessage);
      }
      const isUserExist = await User.findOne({
        where: { email: req.body.email.toLowerCase(), deletedAt: null },
        raw: true,
      });
      if (!isUserExist) {
        throw createError(
          404,
          stringConstants.genericMessage.EMAIL_NOT_REGISTERED
        );
      }
      res.locals.request = {
        user: isUserExist,
      };
      next();
    } catch (err) {
      next(err);
    }
  }

//   async validateResetPasswordRequest(req: any, _res: any, next: any) {
//     try {
//       const { new_password, email, verification_code } = req.body;
//       let errorMessage = templateConstants.PARAMETER_MISSING('email'),
//         isError = false,
//         statusCode = 400,
//         subCode = 1100;
//       if (!email) {
//         isError = true;
//       } else if (!isEmailValid(email)) {
//         isError = true;
//         errorMessage = templateConstants.INVALID('email');
//         statusCode = 400;
//         subCode = 1101;
//       } else if (!verification_code) {
//         isError = true;
//         errorMessage = templateConstants.PARAMETER_MISSING('verification code');
//       } else if (!new_password) {
//         isError = true;
//         errorMessage = templateConstants.PARAMETER_MISSING('new password');
//       }

//       if (isError) {
//         throw createError(statusCode, errorMessage);
//       }
//       const isUserExist = await User.findOne({
//         where: { email: email.toLowerCase(), deletedAt: null },
//         raw: true,
//       });
//       if (!isUserExist) {
//         throw createError(
//           404,
//           stringConstants.genericMessage.EMAIL_NOT_REGISTERED
//         );
//       }
//       await otpService.validatePasswordResetCode(
//         req.body.verification_code + config.SECRET_KEY_FOR_PASSWORD_FORGOT,
//         req.body.email
//       );
//       const { password, oldPasswordOne, oldPasswordTwo } = isUserExist;
//       //Is same as old password : conditions
//       const currentPassword = await passwordService.comparePassword(
//         new_password,
//         password
//       );
//       const _oldPasswordOne = oldPasswordOne
//         ? await passwordService.comparePassword(new_password, oldPasswordOne)
//         : false;
//       const _oldPasswordTwo = oldPasswordTwo
//         ? await passwordService.comparePassword(new_password, oldPasswordTwo)
//         : false;
//       if (currentPassword || _oldPasswordOne || _oldPasswordTwo) {
//         throw createError(
//           401,
//           stringConstants.userControllerMessage.PASSWORD_USER_EARLIER
//         );
//       }

//       _res.locals.request = {
//         user: isUserExist,
//       };
//       next();
//     } catch (err) {
//       next(err);
//     }
//   }
//   async validateVerifyOtpRequest(req: any, _res: any, next: any) {
//     try {
//       const { email, verification_code } = req.body;
//       const isUserExist = await User.findOne({
//         where: { email: email.toLowerCase(), deletedAt: null },
//         attributes: ['username', 'userId'],
//         raw: true,
//       });
//       if (!isUserExist) {
//         throw createError(
//           404,
//           stringConstants.genericMessage.EMAIL_NOT_REGISTERED
//         );
//       }
//       await otpService.validateOtpForEmail(verification_code, email);
//       _res.locals.request = {
//         user: isUserExist,
//       };
//       next();
//     } catch (err) {
//       next(err);
//     }
//   }

//   async validateAgent(req: any, res: any, next: any) {
//     try {
//       const { id } = req.params;
//       let isUserExist = await User.findOne({
//         where: {
//           userId: id,
//           deletedAt: null,
//         },
//         attributes: ['userId'],
//         raw: true,
//       });
//       if (!isUserExist) {
//         throw createError(400, templateConstants.INVALID('id'));
//       }
//       next();
//     } catch (err) {
//       next(err);
//     }
//   }

//   async validateUpdatePasswordRequest(req: any, res: any, next: any) {
//     try {
//       const { new_password, old_password } = req.body;
//       const user = await User.findOne({
//         where: { email: res.user.email.toLowerCase(), deletedAt: null },
//         attributes: ['password', 'oldPasswordOne', 'oldPasswordTwo', 'userId'],
//         raw: true,
//       });
//       const isPasswordMatched = await passwordService.comparePassword(
//         old_password,
//         user.password
//       );
//       if (!isPasswordMatched) {
//         throw createError(
//           400,
//           stringConstants.userControllerMessage.INVALID_CURRENT_PASSWORD
//         );
//       }

//       const _oldPasswordOne = user.oldPasswordOne
//         ? await passwordService.comparePassword(
//             new_password,
//             user.oldPasswordOne
//           )
//         : false;
//       const _oldPasswordTwo = user.oldPasswordTwo
//         ? await passwordService.comparePassword(
//             new_password,
//             user.oldPasswordTwo
//           )
//         : false;

//       const isNewPasswordAsOldPasswor = new_password === old_password;
//       if (isNewPasswordAsOldPasswor || _oldPasswordOne || _oldPasswordTwo) {
//         throw createError(
//           401,
//           stringConstants.userControllerMessage.PASSWORD_USER_EARLIER
//         );
//       }
//       res.locals.request = {
//         user: user,
//       };

//       next();
//     } catch (err) {
//       next(err);
//     }
//   }

  // async validateUpdateProfile(req: any, res: any, next: any) {
  //   try {
  //     const { phone } = req.body;
  //     if (phone) {
  //       const isPhoneExist = await User.findOne({
  //         where: {
  //           phone: phone,
  //           userId: { [Op.ne]: res.user.userId },
  //           deletedAt: null,
  //         },
  //         attributes: ['phone'],
  //       });

  //       if (isPhoneExist) {
  //         throw createError(401, templateConstants.ALREADY_EXIST('phone'));
  //       }
  //     }
  //     next();
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}

const validateUserApis = new ValidateUserApis();
export { validateUserApis };
