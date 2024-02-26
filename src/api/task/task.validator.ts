import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { BadRequestException } from "../../app/error/exception/bad-request-error";
export default function taskValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object({
    title: Joi.string()
      .required()
      .messages({ "string.empty": `Title cannot be an empty field` }),
    description: Joi.string()
      .required()
      .messages({ "string.empty": `Description cannot be an empty field` }),
    status: Joi.string()
      .required()
      .messages({ "string.empty": `Status cannot be an empty field` }),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    throw new BadRequestException(
      error.details[0].message.replace(/['"]+/g, "")
    );
  } else {
    req.body = value;
    next();
  }
}
