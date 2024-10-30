import { Request, Response } from 'express';
import { practiceModel } from "../../../db/practice.ts";

export const getPractice = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const subject = await practiceModel.findById(id).exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
