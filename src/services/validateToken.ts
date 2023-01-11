import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

interface IPayload {
    email: string;
    iat: number;
    exp: number;
}

export const validationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  try {
    const token = req.header("auth-token");

    if (!token) return res.status(401).json({ message: "Acceso denegado" });

    const payload = jwt.verify(
      token,
      process.env.TOKEN_SECRET || "tokencaseundefined"
    ) as IPayload;

    const user = await User.findOneBy({email: payload.email});

    if(!user) return res.status(404).json({message: 'No se encontro el usuario'});

    next();
  } catch (error) {
    res.status(400).send('Token invalido');
  }
};
