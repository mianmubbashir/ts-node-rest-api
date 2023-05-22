import { ERRORS } from "../messages/errors";

export const validateBook = ({ name = "", author = "", description = "" }) => {
  if (!name) {
    return { is_validated: false, status: 400, message: ERRORS.name };
  }
  if (!author) {
    return { is_validated: false, status: 400, message: ERRORS.author };
  }
  if (!description) {
    return { is_validated: false, status: 400, message: ERRORS.description };
  }

  return { is_validated: true, status: 200, message: "" };
};

export const validateBookId = ({ id = "" }) => {
  if (!id) {
    return { is_validated: false, status: 400, message: ERRORS.book_id };
  }

  return { is_validated: true, status: 200, message: "" };
};

export const validateBookUpdate = ({
  id = "",
  name = "",
  author = "",
  description = "",
}) => {
  if (!id) return { is_validated: false, status: 400, message: ERRORS.book_id };

  if (!name && !author && !description) {
    return { is_validated: false, status: 400, message: ERRORS.provideField };
  }
  return { is_validated: true, status: 200, message: "" };
};
