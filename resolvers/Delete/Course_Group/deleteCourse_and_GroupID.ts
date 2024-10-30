import { Request, Response } from 'express';
import { Courses_and_GroupsModel } from "../../../db/courses_and_groups.ts";
import { Courses_and_Groups } from "../../../types.ts";

export const deleteCourse_and_GroupID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const course = await Courses_and_GroupsModel.findByIdAndDelete(id).exec();
    if(!course){
        res.status(404).send('Course not found');
        return;
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(404).send(error);
  }
};
