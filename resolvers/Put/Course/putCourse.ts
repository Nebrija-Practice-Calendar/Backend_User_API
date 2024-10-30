import { Request, Response } from 'express';
import { courseModel } from "../../../db/course.ts";

export const putCourse= async (req: Request, res: Response) => {
  try {
    const {id, name,id_course_and_group} = req.body;
    if(!id||!id_course_and_group) {
        res.status(404).send('Name are required');
    }
    const course = await courseModel.findByIdAndUpdate(
        id,
        { $addToSet: { id_course_and_group } },
        { new: true, upsert: true }
    ).exec();

    res.status(course ? 200 : 201).send(course ? "Course updated" : "Course created");
  } catch (error) {
    res.status(404).send(error);
  }
};
