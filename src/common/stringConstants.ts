import { randomUUID } from 'crypto';

const passwordServiceMessage = {
  WRONG_PASSWORD:
    'Incorrect Password! Please enter registered password to login.',
  PASSWORD_MATCHED: 'Password matched',
};
const genericMessage = {
  NOT_FOUND: 'Not Found',
  TOKEN_DOES_NOT_EXIST: 'Provide Token',
  SERVER_ERROR: 'Server Error',
  NO_NOTIFICATIONS: 'No Notifications',
  USER_EXISTS: 'You are already registered. Please login to continue.',
  NO_TRANSACTIONS: 'No Transactions',
  EMAIL_NOT_REGISTERED: 'Email not registered',
  USER_NOT_AUTHORIZED: 'User not authorized',
  MISSING_EMAIL_DATA: 'Email is not available',
  EMAIL_ALREADY_EXIST: 'This email already exist',
  ONLY_ADMIN_ALLOWED: 'Only admin allowed',
  AGENT_EXISTS: 'Agent already exist',
  OTP_VERIFIED_SUCCESSFULLY: 'Otp verified successfully',
};

const authServiceMessage = {
  UNAUTHORIZED_PLATFORM: 'Unauthorized Platform',
  UNAUTHORIZED_CLIENT: 'Unauthorized Client',
  TOKEN_VERIFIED: 'Token verified',
  TOKEN_EXPIRED: 'Token has expired. Login to continue',
  ACCOUNT_NOT_ACTIVATED:
    'Your account has been deactivated. Please contact super admin for assistance.',
};

const tokenServiceMessage = {
  USER_ID_DOES_NOT_EXIST: "User ID doesn't exist",
  USER_ID_IS_INVALID: 'Please provide User ID',
  TOKEN_IS_INVALID: 'Please provide token',
};

const userControllerMessage = {
  PASSWORD_CHANGED: 'Successfully changed password',
  INVALID_CURRENT_PASSWORD: 'Invalid current password',
  REGISTERED: 'Successfully registered',
  LOGGED_OUT: 'You have successfully logged out.',
  LOGGED_IN: 'Welcome! You have successfully logged in to your account. ',
  VERIFICATION_MAIL_SENT:
    'You can use this code for 30 minutes. Otherwise, please click on Resend code.',
  KYC_VERIFICATION_MAIL_SENT: 'KYC verification mail sent',

  RESET_PASSWORD:
    'Your password has been successfully reset. Please use your new password to log in.',
  ONE_TIME_PASSWORD_EXPIRED: 'Your one time password has expired',
  USER_UPDATED_SUCCESSFULLY: 'User updated successfully',
  USER_DOESNT_EXIST: 'User does not exist',
  FORGOT_PASSWORD_NOTIFICATION_TITLE: 'Password Changed',
  ACCOUNT_VERIFICATION_NOTIFICATION_TITLE: 'Account Verified',
  PASSWORD_USER_EARLIER:
    'Password not updated. Cannot use the same password which has been used earlier. Kindly set a new password',
  FEEDBACK_EXIST: 'Feedback is already exist',
};

const redisServiceMessage = {
  KEY_DOES_NOT_EXIST: "Key doesn't exist",
  REDIS_ERROR: 'Redis Error',
  KEY_IS_INVALID: 'Please provide key',
  VALUE_IS_INVALID: 'Please provide value',
};

const systemMessage = {
  EMAIL_NOT_PROVIDED: 'Provide Email',
  UNABLE_TO_SEND_EMAIL: 'Email cannot be sent',
  RECIPIENT_EMAIL_NOT_EXISTS: 'Provide Email and Name of recipient',
  EMAIL_BODY_NOT_EXISTS: 'Provide Email Body',
  EMAIL_SUBJECT_NOT_EXISTS: 'Provide Email Subject',
  EMAIL_SUCCESSFULLY_SENT: 'Email sent',
};
const otpServiceMessage = {
  OTP_EMAIL_SUBJECT: 'Verification code for email verification',
  OTP_SUCCESS_SENT_MESSAGE: 'Verification code sent',
  OTP_EXPIRED: 'Verification code has expired!',
};

export = {
  passwordServiceMessage,
  genericMessage,
  authServiceMessage,
  tokenServiceMessage,
  userControllerMessage,
  redisServiceMessage,
  systemMessage,
  otpServiceMessage,
};
