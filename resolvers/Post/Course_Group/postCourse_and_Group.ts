import { Request, Response } from 'express';
import { Period } from "../../../types.ts";
import { Courses_and_GroupsModel } from "../../../db/courses_and_groups.ts";

export const postCourse_and_Group = async (req: Request, res: Response) => {
  try {
    const {name} = req.body;
    if(!name) {
        res.status(404).send('Name are required');
    }
    const existCourse_and_Group = await Courses_and_GroupsModel.findOne({name:name}).exec();
    if(existCourse_and_Group){
        res.status(404).send('Course already exist');
        return
    }
    const course_and_group = new Courses_and_GroupsModel({
        name
    });
    await course_and_group.save();
    res.status(200).send("Course created");
  } catch (error) {
    res.status(404).send(error);
  }
};
