import { Request, Response } from 'express';
import { ExceptionModel } from "../../../db/exception.ts";

export const deleteExceptionID = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const exception = await ExceptionModel.findByIdAndDelete(id).exec();
    if(!exception){
        res.status(404).send('Course not found');
        return;
    }
    res.status(200).json(exception);
  } catch (error) {
    res.status(404).send(error);
  }
};
