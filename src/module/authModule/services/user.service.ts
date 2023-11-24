import { jwtService } from '../../../services/user/jwtService';
import { tokenService } from '../../../services/common/tokenService';
import { config } from '../../../config/config';
import { User } from '../../../models/User/user';
import { Op } from 'sequelize';

class UserService {
  async createLoginToken(user: any, email: string) {
    try {
      const {
        userId,
        username,
        role,
        profileImg,
        phone,
       // isKycDone,
        parentUserId,
        subRoleId,
      } = user;
      const token = await jwtService.generateToken({
        userId: userId,
        username: username,
        email: email,
        phone: phone,
      });
      await tokenService.setToken(userId, token, config.authConfig.tokenExpiry);
      return token;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
const userService = new UserService();
export { userService };
