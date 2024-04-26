import { User } from "../models/user.model.js";
import AuthService from "../services/auth.services.js";
import Encryption from "../services/encryption.services.js";
import NodeMailer from "../services/nodemailer.services.js";
import UserService from "../services/user.services.js";

export const getUserController = async (req, res) => {
  try {
    // data destructure
    const { user_id } = req.params;
    const existingUser = await User.findById(user_id);

    if(!existingUser){
      return res.status(500).json({
        success: false,
        message: "User doesn't exist",
      });
    }
    else{
      return res.status(200).json({
        success: true,
        message: "User found successfully",
        data: {
          user: existingUser
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



export const createUserController = async (req, res) => {
    try {
        const {name, email, password} = req.body
        console.log(name, email, password)
        const existingUser = await User.findOne({email: email})

        if(existingUser) {
          return res.status(500).json({
            success: false,
            message: "User already exists",
          });
        }
        else {
          const hashedPassword = Encryption.hashPassword(password)
          const newUser = new User({name, email, password:hashedPassword})
          await newUser.save();
          return res.status(200).json({
            success: true,
            message: "User created Successfully",
          });
        }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  
export const updateUserController = async (req, res) => {
    try {
      // data destructure
      const { user_id, name } = req.body;
        const updatedUser = await User.findByIdAndUpdate(user_id, {name}, {new: true})
        return res.status(200).json({
          success: true,
          message: "User updated successfully",
          data: {
            user: updatedUser,
          },
        });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  
export const updateUserPasswordController = async (req, res) => {
    try {
      // data destructure
      const { user_id , password} = req.body;
        const updatedUser = await User.findByIdAndUpdate(user_id, {password}, {new:true})
        return res.status(200).json({
          success: true,
          message: "User password updated successfully",
        });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  
export const deleteUserController = async (req, res) => {
    try {
      // data destructure
      const { user_id } = req.params;
        const deletedUser = await User.findByIdAndDelete(user_id)

        if(deletedUser){
            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
              
              });
        }
        else{
            return res.status(500).json({
                success: false,
                message: "User couldn't be deleted",
            
              });
        }
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };


  export const LoginUserController = async (req, res) => {
    try {
      // data destructure
      const { email, otp } = req.body;
      
      const existingUser = await User.findOne({email: email})

      if (!existingUser) {
        return res.status(201).json({
            success: false,
            message: "User doesn't exist"
        })
      }
      else {
        if (verifyOTP(otp ,existingUser.otp, existingUser.otp_created_at) ){
            const accessToken = AuthService.generateAcessToken(existingUser._id)
            const refreshToken = AuthService.generateAcessToken(existingUser._id)
            
            // update the otp and otpcreated at data 
            // in the database
            await User.findByIdAndUpdate(existingUser._id,{otp: null, otp_created_at: null}, {new: true})

            return res.status(200).json({
              success: true,
              message: "User Logged in Successfully",
              data: {
                  accessToken: accessToken,
                  refreshToken: refreshToken
              }
            })
        }
        else{
            return res.status(200).json({
                success: false,
                message: "Otp expired"
            })
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  function generateOTP() {
    const min = 100000; 
    const max = 999999; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCurrentTime() {
    return new Date(); // Return current time as Date object
}

function verifyOTP(otpEntered, otp, time) {
    const currentTime = new Date(); // Get current time
    const otpTime = new Date(time); // Convert stored time to Date object
    const difference = (currentTime - otpTime) / 1000; // Difference in seconds
    
    // Verify OTP and ensure time difference is within 2 minutes
    return otp === otpEntered && difference <= 120;
}
  export const getOtpController = async (req, res) => {
    try {
      const {email, password}  = req.body;

      const existingUser = await User.findOne({email: email})

      if (!existingUser){
        return res.status(500).json({
          success: false,
          message: "User doesn't exist with this email please signup",
        });
      }
      else{
        console.log(password)
        console.log(existingUser.password)
        if (Encryption.verifyPassword(password, existingUser.password)){
          const otp = generateOTP();
          const time = getCurrentTime();
          await User.findByIdAndUpdate(existingUser._id, {otp: otp, otp_created_at: time}, {new: true})

          await NodeMailer.sendNodeMail(existingUser.email, "Password golare jaldi deide", otp ,"OTP au kahaku kahibuni nohele asubidha heijibo !!")
          return res.status(200).json({
            success: true,
            message: "Otp Sent successfully"
          })
        }
        else{
          return res.status(500).json({
            success: false,
            message: "The password is wrong please try again",
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

 
  