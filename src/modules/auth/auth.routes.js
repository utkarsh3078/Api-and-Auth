import { Router } from "express";
import * as controller from "./auth.controller";
import validate from "../../common/middleware/validate.middleware";
import registerDto from "./dto/register.dto";
import LoginDto from "./dto/login.dto";

const router = Router();

router.post("./register", validate(registerDto), controller.register);
router.post("./login", validate(LoginDto), controller.login);
router.post("./logout", controller.logout);
router.get("./me", authenticate, controller.getMe);

export default router;
