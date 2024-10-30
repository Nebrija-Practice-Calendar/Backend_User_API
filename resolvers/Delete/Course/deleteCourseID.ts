import { Request, Response } from 'express';
import {Course} from "../../../types.ts";
import { courseModel } from "../../../db/course.ts";

export const deleteCourseID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const course = await courseModel.findByIdAndDelete(id).exec();
    if(!course){
        res.status(404).send('Course not found');
        return;
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(404).send(error);
  }
};
