import { Request, Response } from 'express';
import { Subjects_Timetables } from "../../../types.ts";
import { Subjects_TimetablesModel } from "../../../db/subjects_timetables.ts";

export const getSubject_Timetable = async (req: Request, res: Response) => {
  try {
    const id_Course_and_Group  = req.query.id_Course_and_Group as string;
    const id_Period = req.query.id_Period as string;
    console.log(id_Course_and_Group);
    console.log(id_Period);
    if (!id_Course_and_Group || !id_Period) {
      res.status(400).send("Bad request missing parameters");
      return;
    }
    const subjectTimetable = await Subjects_TimetablesModel.findOne({
      id_course: id_Course_and_Group,
      id_period: id_Period
    }).exec();
    console.log(subjectTimetable);

    /*
    if (!subjectTimetable) {
      return res.status(404).json({ message: 'No se encontraron horarios para la selección actual.' });
    }
      */
    res.status(200).json(subjectTimetable);
  } catch (error) {
    res.status(404).send(error);
  }
};
