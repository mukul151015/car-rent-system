import stringConstants from '../../../common/stringConstants';
import { passwordService } from '../../../services/user/passwordService';
import { jwtService } from '../../../services/user/jwtService';
import { tokenService } from '../../../services/common/tokenService';
import { config } from '../../../config/config';
import { User } from '../../../models/User/user';
import {
  generatePassword,
  isNullOrUndefined,
  isValidGuid,
} from '../../../common/utility';
import { redisService } from '../../../services/common/redisService';
import { userService } from '../services/user.service';

class AuthController {
  async register(req: any, res: any, next: any) {
    try {
     // console.log("is it calling");
      const { email, password, username, residence} = req.body;
      const passwordHash = await passwordService.hashPassword(password);
      const user = await User.create({
        email: email.toLowerCase(),
        password: passwordHash,
        username: username,
        residence:residence,

      });
      const token = await jwtService.generateToken({
        userId: user.dataValues.userId,
        username: user.dataValues.username,
        email: user.dataValues.email,
        phone: user.phone,
      });
      await tokenService.setToken(
        user.dataValues.userId,
        token,
        config.authConfig.tokenExpiry
      );
      res.locals.response = {
        body: {
          data: {
            user: {
              token: token,
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
  async login(req: any, res: any, next: any) {
    try {
     // console.log("ok it's login api")
      const { email } = req.body;
      const { role, isKycDone, phone } = res.locals.request.user;
      let data = {};
      const token = await userService.createLoginToken(
        res.locals.request.user,
        email
      );
      data = {
        token: token,
        isKycDone: isKycDone,
        role: role,
      };

      res.locals.response = {
        body: {
          data: {
            user: data,
          },
        },
        message: stringConstants.userControllerMessage.LOGGED_IN,
      };
      next();
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
  async logout(req: any, res: any, next: any) {
    try {
      await tokenService.deleteToken(res.user.userId);
      res.locals.response = {
        message: stringConstants.userControllerMessage.LOGGED_OUT,
      };
      next();
    } catch (err) {
      next(err);
    }
  }
  async forgotPassword(req: any, res: any, next: any) {
    try {
      const { email } = req.body;
      const { userId, username } = res.locals.request.user;
      res.locals.response = {
        body: {
          data: {
            name: username,
          },
        },
        message: stringConstants.userControllerMessage.VERIFICATION_MAIL_SENT,
      };
      next();
    } catch (err) {
      next(err);
    }
  }


}

const authController = new AuthController();
export { authController };
