import { statusCodes } from '../enums';
import { IError } from './errorInterface';

export class UnprocessableEntity extends Error implements IError {
  public statusCode: number;
  public message: string;
  public name: string;
  constructor(message: string) {
    super(message);
    this.name = 'UnprocessableEntity';
    this.message = message;
    this.statusCode = statusCodes.UNPROCESSABLE_ENTITY;
  }
}

export default UnprocessableEntity;
