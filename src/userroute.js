import { Router } from "express";
import { getAllUserController, registerUserController, userLoginController } from "../src/controllers/user.controllers.js";

//api/users
const userRouter = Router();
userRouter.get("/", getAllUserController);
userRouter.post("/register",registerUserController)
userRouter.post("/login", userLoginController);

export default userRouter;