import ApiError from "../utils/api-error";

const validate = (Dtoclass) => {
  return (req, res, next) => {
    const { errors, value } = Dtoclass.validate(req.body);
    if (errors) {
      throw ApiError.badRequest(errors.join("; "));
    }
    req.body = value; //Jo sanitized data hai wo hi aage jayega baki sab will be dumped and then we move ahead
    next();
  };
};

export default validate;
