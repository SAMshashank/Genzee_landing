const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import Admin from "../schema/Admin.model";
import cookie from 'cookie';

// const fetchuser = require('../middleware/getuser')

import fetchUser from "../middleware/getuser";

const router =  express.Router();
const JWt_SECRET = 'myjwtsom@u';

router.post('/createadmin', async (req: any, res: any) => {
    const success = false;
    const requiredHeader = 'somu@553';
  
    // Check if the x-id-secret header exists and is valid
    const headerValue = req.headers['x-id-secret'];
    if (!headerValue || headerValue !== requiredHeader) {
      return res.status(401).json({ success, message: 'Unauthorized' });
    }
  
    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res.status(400).json({ success, message: "A user with this email already exists" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);
      admin = await Admin.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
      });
  
      const data = {
        user: {
          id: admin.id,
        },
      };
  
      const authtoken = jwt.sign(data, JWt_SECRET);
      res.json({ success: true, authtoken });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, message: err });
    }
  });
  
//todo: login
router.post('/login', async (req:any, res:any) => {
    let success = false;
    // If there are errors, return Bad request and the errors

  
    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        success = false;
        return res.status(400).json({success, error: "Please try to login with correct credentials" });
      }
  
      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }
  
      const data = {
        user: {
          id: admin.id
        }
      }
      const authtoken = jwt.sign(data, JWt_SECRET);
      success = true;
      res.setHeader('Set-Cookie', cookie.serialize('auth_token', authtoken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production', // set secure flag in production
        maxAge: 60 * 60, // 1 hour
        path: '/',
      }));
  
      return res.status(200).json({ message: 'Logged in successfully' });
  
    } catch (error:any) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
});

router.get('/getuserdata',fetchUser, async (req:any, res:any)=>
{
      try {
        const requiredHeader = 'somu@553';
  
        // Check if the x-id-secret header exists and is valid
        const headerValue = req.headers['x-id-secret'];
        if (!headerValue || headerValue !== requiredHeader) {
          return res.status(401).json({ success:false, message: 'Unauthorized' });
        }
        let users= await Admin.find({}).select("-password");
        res.json(users);
      } catch (error:any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})

router.delete('/deleteuser',fetchUser, async (req:any, res:any)=>{
    try{
        const requiredHeader = 'somu@553';
        const headerValue = req.headers['x-id-secret'];
        if (!headerValue || headerValue !== requiredHeader) {
          return res.status(401).json({ success:false, message: 'Unauthorized' });
        }
        let user= await Admin.findById(req.body.id);
           if(!user) {
            
               res.status(404).send("Not Found");
              
           }
           else{

             user = await Admin.findByIdAndDelete(req.body.id);   
             res.json(user);
           }
    }
    catch (error:any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


export default router;