import { Request, Response } from 'express';
import { Subjects_Timetables } from "../../../types.ts";
import { Subjects_TimetablesModel } from "../../../db/subjects_timetables.ts";

export const getSubjects_Timetables = async (_req: Request, res: Response) => {
  try {

    const subjectTimetable = await Subjects_TimetablesModel.find().exec();
    res.status(200).json(subjectTimetable);
  } catch (error) {
    res.status(404).send(error);
  }
};
