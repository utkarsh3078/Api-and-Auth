import Joi from "joi";
import baseDto from "../../../common/dto/baseDto.js";

class LoginDto extends baseDto {
  static schema = Joi.object({
    email: Joi.string().email().min(2).max(100).lowercase().required(),
    password: Joi.string().min(6).max(100).required(),
  });
}

export default LoginDto;
