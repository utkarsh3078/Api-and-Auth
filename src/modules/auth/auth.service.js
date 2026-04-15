import ApiError from "../../common/utils/api-error";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.utils";
import user from "./auth.model";

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const register = async ({ name, email, password, role }) => {
  //do user registration logic here
  const existing = await user.findOne({ email });
  if (existing) throw new ApiError.conflict("Email already exists");
  let userOBj;

  const { rawToken, hashedtoken } = generateResetToken();
  //rawToken = goes to user
  //hashedToken = goes to DB

  await user.create({
    name,
    email,
    password,
    role,
    verficationToken: hashedtoken,
  });

  //TODO: send an email to user with token: rawToken

  return userOBj;
};

const login = async ({ email, password }) => {
  //take email find email in db
  //check pwass is corect or not
  //check if verified or not

  const userData = await user.findOne({ email }).select("+password");
  if (!userData) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  //Somehow i will check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

  if (!userData.isVerified) {
    throw ApiError.forbidden("Pls verify your email");
  }

  //Now I want to send token to user
  const accessToken = generateAccessToken({
    id: userData._id,
    role: userData.role,
  });
  const refreshToken = generateRefreshToken({
    id: userData._id,
  });

  userData.refreshToken = hashToken(refreshToken);
  await userData.save({ validateBeforeSave: false });

  const userObj = userData.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { userData: userObj, accessToken, refreshToken };
};

const refresh = async (token) => {
  if (!token) throw ApiError.unauthorized("Refresh token missing");
  const decoded = verifyRefreshToken(token);

  const User = await user.findById(decoded.id).select("+refreshToken");
  if (!User) throw new ApiError.unauthorized("User not found");

  if (User.refreshToken !== hashToken(token)) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const accessToken = generateAccessToken({ id: User._id, role: User.role });

  return { accessToken };
};

const logout = async (userId) => {
  await user.findByIdAndUpdate(userId, { refreshToken: null });
};

const forgotPassword = async (email) => {
  const userData = await user.findOne({ email });
  if (!userData) throw ApiError.notFound("No account with this email");

  const { rawToken, hashedToken } = generateResetToken();
  userData.resetPasswordToken = hashedToken;
  userData.resetPasswordExpires = Date.now() + 3600000; //1 hour
  await userData.save({ validateBeforeSave: false });

  //TODO: send email to user with rawToken
};

const getMe = async (userId) => {
  const User = await user.findById(userId);
  if (!user) throw ApiError.notFound("User not found");
  return user;
};

export { register, login, refresh, logout };
