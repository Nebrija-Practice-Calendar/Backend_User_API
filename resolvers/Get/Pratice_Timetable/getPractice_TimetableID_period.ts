import { Request, Response } from 'express';
import { Practices_Timetables } from "../../../types.ts";
import { Practices_TimetablesModel } from "../../../db/practices_timetables.ts";
export const getPractice_TimetableID_period = async (req: Request, res: Response) => {
  try {
    const id_Period = req.query.id_Period as string;
    console.log(id_Period);
    if ( !id_Period) {
      res.status(400).send("Bad request missing parameters");
      return;
    }
    const practiceTimetable = await Practices_TimetablesModel.findOne({
      id_period: id_Period
    }).exec();
    console.log(practiceTimetable);

    res.status(200).json(practiceTimetable);
  } catch (error) {
    res.status(404).send(error);
  }
};
