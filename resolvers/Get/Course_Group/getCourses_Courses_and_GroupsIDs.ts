import { Request, Response } from 'express';
import { Courses_and_GroupsModel } from "../../../db/courses_and_groups.ts";
import { courseModel } from "../../../db/course.ts";

export const getCourses_Courses_and_GroupsIDs = async (req: Request, res: Response) => {
  try {
    const id = (req.query.id as string).split(',');
    console.log("IDs recibidos:", id);
    const course = await courseModel.find({
      _id: { $in: id }
    }).exec();
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    if (course.length === 0) {
      return res.status(404).send("Courses not found");
    }
    console.log("Cursos encontrados:", course);
    const idsCoursesAndGroups = course.map(course => course.id_course_and_group).filter(id => id !== undefined) .flat();
    console.log("IDs de Courses_and_Groups:", idsCoursesAndGroups);

    if (idsCoursesAndGroups.length === 0) {
      return res.status(404).send("No Courses_and_Groups IDs found for the given courses");
    }

    const coursesgroups = await Courses_and_GroupsModel.find({
      _id: { $in: idsCoursesAndGroups }
    }).exec();

    console.log("Courses_and_Groups encontrados:", coursesgroups);
    res.status(200).json(coursesgroups);
  } catch (error) {
    res.status(404).send(error);
  }
};
