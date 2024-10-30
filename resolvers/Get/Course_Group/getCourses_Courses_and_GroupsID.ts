import { Request, Response } from 'express';
import { Courses_and_GroupsModel } from "../../../db/courses_and_groups.ts";
import { courseModel } from "../../../db/course.ts";

export const getCourses_Courses_and_GroupsID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    console.log(id);
    const course = await courseModel.findById(id).exec();
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    console.log(course);
    const ids:string[]= course.id_course_and_group;
    console.log(ids);
    const coursesgroups = await Courses_and_GroupsModel.find({
      _id: { $in: ids }
    }).exec();
    res.status(200).json(coursesgroups);
  } catch (error) {
    res.status(404).send(error);
  }
};
