import { Request, Response } from 'express';
import { Subjects_TimetablesModel } from "../../../db/subjects_timetables.ts";

export const deleteSubjectsTimetableID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const subjectsTimetable = await Subjects_TimetablesModel.findByIdAndDelete (id).exec();
    if(!subjectsTimetable){
        res.status(404).send('Subjects Timetable not found');
        return;
    }
    res.status(200).json(subjectsTimetable);
  } catch (error) {
    res.status(404).send(error);
  }
};
