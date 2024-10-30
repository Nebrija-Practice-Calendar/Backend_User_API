import { Request, Response } from 'express';
import { degreeModel } from "../../../db/degree.ts";

export const postDegree = async (req: Request, res: Response) => {
  try {
    const {name} = req.body;
    if(!name) {
        res.status(404).send('Name are required');
    }
    const existDegree = await degreeModel.findOne({name:name}).exec();
    if(existDegree){
        res.status(404).send('Degree already exist');
        return
    }
    const degree = new degreeModel({
        name
    });
    await degree.save();
    res.status(200).send("Degree created");
  } catch (error) {
    res.status(404).send(error);
  }
};
