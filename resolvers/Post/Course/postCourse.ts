import { Request, Response } from 'express';
import { courseModel } from "../../../db/course.ts";

export const postCourse= async (req: Request, res: Response) => {
  try {
    const {name, id_course_and_group} = req.body;
    if (!name || !Array.isArray(id_course_and_group) || id_course_and_group.some(id => typeof id !== 'string')) {
        return res.status(400).send('Name and id_course_and_group (array of strings) are required');
      }
    const existCourse = await courseModel.findOne({name:name}).exec();
    if(existCourse){
        res.status(404).send('Course already exist');
        return
    }
    const course = new courseModel({
        name,
        id_course_and_group
      });
    await course.save();
    res.status(200).send("Course created");
  } catch (error) {
    res.status(404).send(error);
  }
};
