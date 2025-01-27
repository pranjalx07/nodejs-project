import { Router } from "express";
import { userLoginController } from "./controllers/user.controllers.js"

const userRouter=Router()
userRouter.post("/login",userLoginController)
userRouter.post("/getAllusers")
export default userRouter