import express from 'express';
import { LoginUserController, createUserController, deleteUserController, getOtpController, getUserController, updateUserController, updateUserPasswordController } from '../controllers/user.controllers.js';
import { auth } from '../middlewares/auth.middlewares.js';

const userRouter = express.Router();

userRouter.get("/getuser",auth, getUserController)
userRouter.post("/createuser", createUserController)
userRouter.put("/updateuser",auth, updateUserController)
userRouter.delete("/deleteUser",auth, deleteUserController)
userRouter.post("/loginuser", LoginUserController)
userRouter.put('/updatepassword',auth, updateUserPasswordController)
userRouter.put('/getotp', getOtpController)

// userRouter.post("/sendmail", sendMailController)
// userRouter.get("/access",auth, getAccessTokenController)

export default userRouter;