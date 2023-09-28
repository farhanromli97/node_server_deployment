import { Router } from "express";
import publicController from "../controllers/publicRoutes.js";
import authController from "../controllers/auth.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const apiRoutes = Router()

apiRoutes.get('/', publicController.get)
apiRoutes.post('/', publicController.post)

apiRoutes.post('/register', authController.auth)
apiRoutes.post('/login', authController.login)

apiRoutes.get('/public', authController.publicController)
apiRoutes.get('/protected', isAuthenticated, authController.protectedController)


export default apiRoutes