import { Request, Response } from 'express';
import { Courses_and_GroupsModel } from "../../../db/courses_and_groups.ts";
import { courseModel } from "../../../db/course.ts";

export const getCourses_Courses_and_GroupsID_period = async (req: Request, res: Response) => {
  try {
    const id_period = req.query.id_period as string;

    const coursesgroups = await Courses_and_GroupsModel.find({
      id_period: id_period
    }).exec();
    res.status(200).json(coursesgroups);
  } catch (error) {
    res.status(404).send(error);
  }
};
