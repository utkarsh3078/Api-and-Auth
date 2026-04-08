import Joi from "joi";
import baseDto from "../../../common/dto/baseDto";

class registerDto extends baseDto {
  static schema = Joi.object({
    name: Joi.string().trim().min(2).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .required()
      .message("Password must be 8 characters"),
    role: Joi.string().valid("customer", "seller").default("customer"),
  });
  // we hv written schema here to overwrite that is written in baseDto so that this can be used
}

export default registerDto;
