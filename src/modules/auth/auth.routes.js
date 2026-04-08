import { Router } from "express";
import * as controller from "./auth.controller";
import validate from "../../common/middleware/validate.middleware";
import registerDto from "./dto/register.dto";

const router = Router();

router.post("./register", validate(registerDto), controller.register);

export default router;
