import { getEmailValidation } from '../../../utils/validator';

export default function ForgotPasswordValidation(email) {
  const errors = {
    ...getEmailValidation(email)
  };

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}
