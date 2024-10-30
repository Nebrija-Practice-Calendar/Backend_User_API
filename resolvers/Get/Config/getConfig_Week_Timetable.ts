import { Request, Response } from 'express';
import { config_week_timetableModel } from "../../../db/config_week_timetable.ts";

export const getConfig_Week_Timetable = async (_req: Request, res: Response) => {
  try {
    const config = await config_week_timetableModel.findOne().exec();
    res.status(200).json(config);
  } catch (error) {
    res.status(404).send(error);
  }
};
