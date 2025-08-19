import express from 'express'
import { addService, delService, getService, updateService, contactusService } from '../controllers/ServiceController.js';

const serviceRouter = express.Router();

serviceRouter.post("/addservice", addService)
serviceRouter.get("/getservice", getService)
serviceRouter.post("/delservice", delService)
serviceRouter.post("/updateservice", updateService)

// route for contact us service
serviceRouter.post('/contactUs', contactusService)

export default serviceRouter