import { Request, Response } from 'express';
import { Period } from "../../../types.ts";
import { PeriodModel } from "../../../db/period.ts";

export const deletePeriodID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const period = await PeriodModel.findByIdAndDelete(id).exec();
    if(!period){
        res.status(404).send('Course not found');
        return;
    }
    res.status(200).json(period);
  } catch (error) {
    res.status(404).send(error);
  }
};
