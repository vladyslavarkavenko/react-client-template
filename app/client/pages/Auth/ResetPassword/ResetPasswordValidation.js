import { getPasswordValidation } from '../../../utils/validator';

export default function ResetPasswordValidation(data) {
  const errors = {
    ...getPasswordValidation(data)
  };

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}
