import { Request, Response } from 'express';
import { Exception } from "../../../types.ts";
import { ExceptionModel } from "../../../db/exception.ts";

export const postException = async (req: Request, res: Response) => {
  try {
    const {name, id_period,start_date,end_date} = req.body;
    if(!name || !start_date || !end_date) {
        res.status(404).send('Name and Exception are required');
    }
    const existException = await ExceptionModel.findOne({name:name}).exec();
    if(existException){
        res.status(404).send('Exception already exist');
        return
    }
    const Exception = new ExceptionModel({
        name,
        id_period,
        start_date,
        end_date
    });
    await Exception.save();
    res.status(200).send("Exception created");
  } catch (error) {
    res.status(404).send(error);
  }
};
