import { Request, Response } from 'express';
import { ExceptionModel } from "../../../db/exception.ts";

export const getExceptionsID_period = async (req: Request, res: Response) => {
  try {
    const id_period = req.query.id_period as string;
    const subject = await ExceptionModel.find({id_period:id_period}).exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
