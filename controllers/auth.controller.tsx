import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { signUpErrors, signInErrors } from "./../utils/errors";

const CreateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

export const Register = async (req: Request, res: Response) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    const user = await User.create({
      email,
      password,
      firstname,
      lastname,
    });
    res.status(201).json({ user: user.email + " Created" });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).json({ errors });
  }
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = CreateToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 604600,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(400).json({ errors });
  }
};

export const Logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 1,
  });
  res.status(200).json({ message: "Logout" });
};
