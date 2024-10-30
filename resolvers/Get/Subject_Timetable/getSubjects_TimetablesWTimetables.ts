import { Request, Response } from 'express';
import { Subjects_Timetables } from "../../../types.ts";
import { Subjects_TimetablesModel } from "../../../db/subjects_timetables.ts";

export const getSubjects_TimetablesWTimetables = async (_req: Request, res: Response) => {
  try {
    const subjectTimetable = await Subjects_TimetablesModel.find({}, '_id id_course id_period').exec();
    res.status(200).json(subjectTimetable);
  } catch (error) {
    res.status(404).send(error);
  }
};
