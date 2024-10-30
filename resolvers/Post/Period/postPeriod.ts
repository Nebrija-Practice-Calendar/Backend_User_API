import { Request, Response } from 'express';
import { Period } from "../../../types.ts";
import { PeriodModel } from "../../../db/period.ts";

export const postPeriod = async (req: Request, res: Response) => {
  try {
    const {name, id_semester,start_date,end_date} = req.body;
    if(!name || !id_semester || !start_date || !end_date) {
        res.status(404).send('Name and Period are required');
    }
    const existPeriod = await PeriodModel.findOne({name:name,id_semester:id_semester}).exec();
    if(existPeriod){
        res.status(404).send('Period already exist');
        return
    }
    const period = new PeriodModel({
        name,
        id_semester,
        start_date,
        end_date
    });
    await period.save();
    res.status(200).send("Period created");
  } catch (error) {
    res.status(404).send(error);
  }
};
