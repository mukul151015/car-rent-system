import { jwtService } from '../../../services/user/jwtService';
import { User } from '../../../models/User/user';
import { passwordService } from '../../../services/user/passwordService';
import { tokenService } from '../../../services/common/tokenService';
import { config } from '../../../config/config';

export const createAdminUser = async () => {
  try {
    const username = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
    const password = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
    const email = `${Date.now()}-${Math.floor(Math.random() * 100)}` + `@gmail.com`;
    const residence = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
    const passwordHash = await passwordService.hashPassword(password);
    const user = await User.create({
      email: email.toLowerCase(),
      password: passwordHash,
      username: username,
      isActive: true,
      role: 'ADMIN',
      residence: residence,
    });
    delete user.password;
    return { password: password, user: user };
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error; // Re-throw the error to propagate it
  }
};

export const createAdminToken = async ({
  userId,
  username,
  email,
  role,
  phone,
}: any) => {
  try {
    const token = await jwtService.generateToken({
      userId: userId,
      username: username,
      email: email,
      role: role,
      phone: phone,
    });

    await tokenService.setToken(userId, token, config.authConfig.tokenExpiry);
    return token;
  } catch (error) {
    console.error('Error creating admin token:', error);
    throw error; // Re-throw the error to propagate it
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const result = await User.destroy({
      where: {
        userId: userId,
      },
    });
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error; // Re-throw the error to propagate it
  }
};
