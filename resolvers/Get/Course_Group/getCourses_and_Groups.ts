import { Request, Response } from 'express';
import { Courses_and_GroupsModel } from "../../../db/courses_and_groups.ts";
import { Courses_and_Groups } from "../../../types.ts";

export const getCourses_and_Groups = async (_req: Request, res: Response) => {
  try {
    const subject = await Courses_and_GroupsModel.find().exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
