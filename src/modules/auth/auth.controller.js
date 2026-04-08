import * as authService from "./auth.service";
import ApiResponse from "../../common/utils/api-res";

const register = async () => {
  const user = await authService.register(req.body);
  ApiResponse.created(res, "Registeration success", user);
};

export { register };
