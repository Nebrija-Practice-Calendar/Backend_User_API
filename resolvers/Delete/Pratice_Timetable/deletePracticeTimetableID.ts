import { Request, Response } from 'express';
import { Practices_TimetablesModel } from "../../../db/practices_timetables.ts";

export const deletePracticeTimetableID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const subjectsTimetable = await Practices_TimetablesModel.findByIdAndDelete (id).exec();
    if(!subjectsTimetable){
        res.status(404).send('Subjects Timetable not found');
        return;
    }
    console.log(subjectsTimetable);
    res.status(200).json(subjectsTimetable);
  } catch (error) {
    res.status(404).send(error);
  }
};
