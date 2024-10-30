import { Request, Response } from 'express';
import { semesterModel } from "../../../db/semester.ts";

export const deleteSemesterID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const semester = await semesterModel.findByIdAndDelete(id).exec();
    if(!semester){
        res.status(404).send('Semester not found');
        return;
    }
    res.status(200).json(semester);
  } catch (error) {
    res.status(404).send(error);
  }
};
