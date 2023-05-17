import { statusCodes } from '../enums';
import { IError } from './errorInterface';

export class Unauthorized extends Error implements IError {
  public statusCode: number;
  public message: string;
  public name: string;
  constructor(message: string) {
    super(message);
    this.name = 'Unauthorized';
    this.message = message;
    this.statusCode = statusCodes.UNAUTHORIZED;
  }
}

export default Unauthorized;
