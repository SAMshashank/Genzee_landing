import { Request, Response } from 'express';
import Subscription from '../schema/Subscription.model';
const express = require('express');


const subscriptionRouter = express.Router();

subscriptionRouter.post('/subscribe',async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;
  
    try {
      // Check if the email is already subscribed
      const existingSubscription = await Subscription.findOne({ email });
      if (existingSubscription) {
        return res.status(400).json({ success: false, message: 'Email is already subscribed.' });
      }
  
      // Create a new subscription
      const newSubscription = new Subscription({ email });
      await newSubscription.save();
  
      return res.status(201).json({
        success: true,
        message: 'Successfully subscribed!',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  })

export default subscriptionRouter;