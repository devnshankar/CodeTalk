import { User } from "../models/user.model.js";
import Encryption from "./encryption.services.js";

class UserService {

  static getUserById = async (id, res) => {
    try {
         // fetch data from db
    const existingUser = await User.findById(id);

    // null check
    if (!existingUser) {
      // send response to user

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      // send response to user

      return res.status(200).json({
        success: true,
        message: "User found successfully",
        data: {
          user: existingUser,
        },
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

  static checkIfUserAlreadyExists = async (email, res) => {
    try {
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return existingUser;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  static createUser = async (name, email, password) => {
    try {

    const hashedPassword = Encryption.hashPassword(password)
      const newUser = new User({ name, email, password: hashedPassword });

      await newUser.save();

      return newUser;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  static deleteUserById = async (id) => {
    try {
      const deletedUser = await User.findByIdAndDelete(id);

      return true;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  static updateUserById = async (id, name) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      return updatedUser;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  static updatePasswordById = async (id, password) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {password: password}, {new: true})

        return updatedUser;
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
    }
  }


}

export default UserService;
