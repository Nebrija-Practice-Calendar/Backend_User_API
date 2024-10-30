import { Request, Response } from 'express';
import { Practice } from "../../../types.ts";
import { practiceModel } from "../../../db/practice.ts";
import { PeriodModel } from "../../../db/period.ts";
import { Courses_and_GroupsModel } from "../../../db/courses_and_groups.ts";
import { SubjectModel } from "../../../db/subject.ts";

export const postPractice = async (req: Request, res: Response) => {
  try {
    const { name, students, computers, observation, id_period, id_course_and_group, id_subject } = req.body;

    let observations = observation || "NULL"; // Simplified conditional assignment
    if(!name || !students || computers===undefined  || !id_period || !id_course_and_group || !id_subject){
        res.status(404).send('Course, Name and Period are required');
    }
    const existPractice = await practiceModel.findOne({
      name,
      id_course_and_group,
      id_period,
      id_subject
    }).exec();
    if(existPractice){
        res.status(404).send('Practice already exist');
        return
    }
    const existPeriod = await PeriodModel.findById(id_period).exec();
    if(!existPeriod){
        res.status(404).send('Period not exist');
        return
    }
    const existGroup = await Courses_and_GroupsModel.findById(id_course_and_group).exec();
    if(!existGroup){
        res.status(404).send('Course and Group not exist');
        return
    }
    const existSubject = await SubjectModel.findOne({code:id_subject}).exec();
    if(!existSubject){
        res.status(404).send('Subject not exist');
        return
    }
    const practice = new practiceModel({
      name,
      students,
      computers,
      observation: observations,
      id_period,
      id_course_and_group,
      id_subject
    });
    await practice.save();
    const id = practice._id;
    console.log(id);
    res.status(200).send(id);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
