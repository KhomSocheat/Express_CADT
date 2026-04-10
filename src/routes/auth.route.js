import express from 'express'
import * as AuthController from '../controllers/Auth/auth.controller.js'

const AuthRouter = express.Router();

AuthRouter.post("/",AuthController.login);

export default AuthRouter;