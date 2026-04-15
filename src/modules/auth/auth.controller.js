import * as authService from "./auth.service";
import ApiResponse from "../../common/utils/api-res";

const register = async () => {
  const user = await authService.register(req.body);
  ApiResponse.created(res, "Registeration success", user);
};

const login = async () => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  ApiResponse.ok(res, "login successful", { user, accessToken });
};

const logout = async (req, res) => {
  await authService.logout(req.user.id);
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  ApiResponse.ok(res, "Logout successful");
};

const getMe = async (req, res) => {
  const user = await authService.getMe(req.user.id);
  ApiResponse.ok(res, "User data fetched successfully", user);
};

export { register };
