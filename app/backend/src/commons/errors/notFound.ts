import { statusCodes } from '../enums';
import { IError } from './errorInterface';

export class NotFound extends Error implements IError {
  public statusCode: number;
  public message: string;
  public name: string;
  constructor(message: string) {
    super(message);
    this.name = 'NotFound';
    this.message = message;
    this.statusCode = statusCodes.NOT_FOUND;
  }
}

export default NotFound;
