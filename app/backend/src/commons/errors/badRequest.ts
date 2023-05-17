import { statusCodes } from '../enums';
import { IError } from './errorInterface';

export class BadRequest extends Error implements IError {
  public statusCode: number;
  public message: string;
  public name: string;
  constructor(message: string) {
    super(message);
    this.name = 'BadRequest';
    this.message = message;
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
