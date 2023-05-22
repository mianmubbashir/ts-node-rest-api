import { ERRORS } from "../messages/errors";

export const validateUser = ({ email = "", password = "" }) => {
  if (!email) {
    return { is_validated: false, status: 400, message: ERRORS.email };
  }
  if (!password) {
    return { is_validated: false, status: 400, message: ERRORS.password };
  }
  return { is_validated: true, status: 200, message: "" };
};

export const validateDeleteId = ({ id = "" }) => {
  if (!id) {
    return { is_validated: false, status: 400, message: ERRORS.user_id };
  }

  return { is_validated: true, status: 200, message: "" };
};

export const validateUserUpdate = ({
  username = "",
  email = "",
  password = "",
}) => {
  // if (!id) return { is_validated: false, status: 400, message: ERRORS.book_id };

  if (!username && !email && !password) {
    return { is_validated: false, status: 400, message: ERRORS.provideField };
  }
  return { is_validated: true, status: 200, message: "" };
};
