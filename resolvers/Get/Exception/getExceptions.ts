import { Request, Response } from 'express';
import { ExceptionModel } from "../../../db/exception.ts";

export const getExceptions = async (_req: Request, res: Response) => {
  try {
    const subject = await ExceptionModel.find().exec();
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).send(error);
  }
};
