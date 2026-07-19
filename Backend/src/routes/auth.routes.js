const {Router}=require("express");
const AuthRouter=Router();
const userController=require("../controllers/auth.controller");
const authMiddleWare=require("../middleware/auth.middleware")
AuthRouter.post("/register", userController.registerUserController);
AuthRouter.post("/login", userController.loginUserController);
AuthRouter.get("/logout", userController.logoutUserController);
AuthRouter.get("/get-me", authMiddleWare.authMiddleware, userController.getMeController);
module.exports=AuthRouter;