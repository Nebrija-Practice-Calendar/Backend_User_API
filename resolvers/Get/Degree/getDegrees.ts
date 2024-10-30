import { Request, Response } from 'express';
import { degreeModel } from "../../../db/degree.ts";

export const getDegrees = async (_req: Request, res: Response) => {
  try {
    const degrees = await degreeModel.find().exec();
    res.status(200).json(degrees);
  } catch (error) {
    res.status(404).send(error);
  }
};
