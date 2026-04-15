import ApiError from "../../common/utils/api-error";

import User from "./auth.model";
const authenticate = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) throw ApiError.unauthorized("Not authenticated");
  const decoded = verifyAccessToken(token);
  const user = await User.findById(decoded.id); //Can be error beacuse of U
  if (!user) throw ApiError.unauthorized("User no longer exists");

  req.user = {
    id: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
  };
  next();
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw ApiError.forbidden(
        "You don't have permission to prerform this action",
      );
    }
    next();
  };
};

export { authenticate, authorize };
