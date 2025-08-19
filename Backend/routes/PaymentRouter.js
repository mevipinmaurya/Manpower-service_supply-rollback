import express from 'express'
import { getKey, paymentVerification, processPayment } from '../controllers/PaymentController.js';

const paymentRouter = express.Router();

paymentRouter.post("/payment/process", processPayment)
paymentRouter.get("/getkey", getKey)
paymentRouter.post("/payment/verification", paymentVerification)

export default paymentRouter