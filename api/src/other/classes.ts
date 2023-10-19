import { StatusCodes } from 'http-status-codes';


export class RouteError extends Error {
  /**
   * Error with status code and message
   */
  public status: StatusCodes;

  public constructor(status: StatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}
