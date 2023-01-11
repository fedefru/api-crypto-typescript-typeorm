import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { encryptPassword, validatePassword } from "../services/encrypt";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = new User();

    user.email = email;
    user.password = await encryptPassword(password);

    await user.save();

    const token = jwt.sign(
      { email: user.email},
      process.env.TOKEN_SECRET || "tokencaseundefined",
      {
        expiresIn: 60 * 4,
      }
    );

    res.status(200).header("auth-token", token).json({
      message: "Usuario creado con exito",
      user: { id: user.id, email: user.email } 
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOneBy({ email: email });

    if (!user) return res.status(400).json("Email o contraseña incorrectos");

    const checkPassword = await validatePassword(user.password, password);

    if(!checkPassword) return res.status(400).json("La contraseña es incorrecta.");

    const token = jwt.sign(
      { email: user.email },
      process.env.TOKEN_SECRET || "tokencaseundefined",
      {
        expiresIn: 60 * 4,
      }
    );

    res.status(200).header("auth-token", token).json({token: token});
  } catch (error) {
    res.status(500).json(error);
  }
};

