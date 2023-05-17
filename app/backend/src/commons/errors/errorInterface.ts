export interface IError extends Error {
  message: string;
  statusCode?: number;
  name: string;
}

export default IError;
