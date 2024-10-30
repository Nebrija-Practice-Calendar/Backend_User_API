import { Request, Response } from 'express';
import { Period } from "../../../types.ts";
import { PeriodModel } from "../../../db/period.ts";

export const getPeriodsID_semester = async (req: Request, res: Response) => {
  try {
    const id_semester = req.query.id_semester as string;
    const subject = await PeriodModel.find({id_semester:id_semester}).exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
