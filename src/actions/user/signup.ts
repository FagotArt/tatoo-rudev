"use server";

import User, { userValidation } from "@/lib/models/user";
import { validate } from "@/lib/utils/validation";
import bcrypt from "bcryptjs";

interface SignUpResponse {
  message: any;
  user?: any;
  error?: any;
}

interface ValidationResponse {
  error?: any;
  errormessage?: any;
}

export const signUp = async (user?: any): Promise<SignUpResponse> => {
  //validate and signup user
  let { error, errormessage, data } : any = await validate(user, userValidation, {
    formatField: (k: string, v: any) => (v === "" ? undefined : v),
    checkAllFields: true,
  });

  //if confirmPassword and password are not same then add error 
  if (user.password !== user.confirmPassword) {
    if(error){
      error.confirmPassword = "Passwords dont match"
    } else {
      error = {
        confirmPassword: "Passwords dont match"
      }
    }
  }

  if (error) {
    return {
      message: errormessage,
      error: error,
    };
  }

  //hash passwords
  const salt = bcrypt.genSaltSync(10);
  data.password = bcrypt.hashSync(data.password, salt);

  //save user to database
  const userdb = await User.create(data);
  console.log(userdb);
  await userdb.save();

  return {
    message: "User Created",
    user: userdb.toObject(),
  };
};


export const validateUser = async (user?: any): Promise<ValidationResponse> => {
  let { error, errormessage }:any = await validate(user, userValidation, {
    formatField: (k: string, v: any) => (v === "" ? undefined : v),
    checkAllFields: false,
  });

  //if confirmPassword and password are not same then add error 
  if (user.password !== user.confirmPassword) {
    // if error is already present then add error to it if not then create new error
    if(error){
      error.confirmPassword = "Passwords dont match"
    } else {
      error = {
        confirmPassword: "Passwords dont match"
      }
    }
  }

  return {error,errormessage}
}