import { Request, Response } from 'express';
import {Course} from "../../../types.ts";
import { courseModel } from "../../../db/course.ts";

export const deleteCourseElementID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const id_course_and_group = req.query.id_course_and_group as string;
    if(!id_course_and_group){
        res.status(404).send('Course and group id not found');
        return;
    }
    const course = await courseModel.findOneAndUpdate(
        { _id: id },
        { $pull: { id_course_and_group: id_course_and_group } },
        { new: true }
    ).exec();

    if(!course){
        res.status(404).send('Course not found');
        return;
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(404).send(error);
  }
};
