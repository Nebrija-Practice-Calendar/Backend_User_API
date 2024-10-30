import { Request, Response } from 'express';
import { Period } from "../../../types.ts";
import { PeriodModel } from "../../../db/period.ts";

export const getPeriods = async (_req: Request, res: Response) => {
  try {
    const subject = await PeriodModel.find().exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
