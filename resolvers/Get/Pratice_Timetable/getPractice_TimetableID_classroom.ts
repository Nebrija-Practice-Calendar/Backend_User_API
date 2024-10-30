import { Request, Response } from 'express';
import { Practices_Timetables } from "../../../types.ts";
import { Practices_TimetablesModel } from "../../../db/practices_timetables.ts";
export const getPractice_TimetableID_classroom = async (req: Request, res: Response) => {
  try {
    const id_classroom = req.query.id_classroom as string;
    console.log(id_classroom);
    if ( !id_classroom) {
      res.status(400).send("Bad request missing parameters");
      return;
    }
    const practiceTimetable = await Practices_TimetablesModel.find({
      id_classroom: id_classroom
    }).exec();

    res.status(200).json(practiceTimetable);
  } catch (error) {
    res.status(404).send(error);
  }
};
