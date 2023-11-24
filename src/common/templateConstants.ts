import compile from 'string-template/compile';

const templateConstants = {
  INVALID: compile('Invalid {0}'),
  PARAMETER_MISSING: compile('Parameter {0} is missing'),
  FORGOT_PASSWORD_EMAIL_SUBJECT: compile('Reset your Password | BiteTime'),
  FORGOT_PASSWORD_EMAIL_BODY: compile(`Hi {userName} ,<br><br>
  We have received a request to reset your account password. If you aren’t the one who made this, you may safely ignore this mail.<br>
  Otherwise, you can use the following code on the app to reset your password:<br>
  <b>{code}</b> <br>
  For any query or assistance, contact us at {contactDetail}.<br><br>
  Thanks,<br>
  Team BiteTime
  `),
  CREATED_SUCCESSFULLY: compile('{0} created successfully'),
  UPLOADED_SUCCESSFULLY: compile('{0} uploaded successfully'),
  UPDATED_SUCCESSFULLY: compile('{0} updated successfully'),
  DELETED_SUCCESSFULLY: compile('{0} deleted successfully'),
  DEACTIVATED_SUCCESSFULLY: compile('{0} deactivated successfully'),
  ACTIVATED_SUCCESSFULLY: compile('{0} activated successfully'),
  EXPORTED_SUCCESSFULLY: compile('{0} exported successfully'),
  LIST_OF: compile('List of {0}'),
  ALREADY_EXIST: compile('{0} already exist'),
  DOES_NOT_EXIST: compile('{0} does not exist'),
  DETAIL: compile('{0} detail fetched successfully'),
  SMS_TEMPLATE: compile('Your OTP is {0} for order. Thanks for Using BiteTime'),
};
export { templateConstants };
