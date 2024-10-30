import { Request, Response } from 'express';
import { practiceModel } from "../../../db/practice.ts";

export const getPractices = async (_req: Request, res: Response) => {
  try {
    const practice = await practiceModel.find().exec();
    res.status(200).json(practice);
  } catch (error) {
    res.status(404).send(error);
  }
};
