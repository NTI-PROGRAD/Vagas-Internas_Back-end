import { Request, Response, } from "express";

export class DocumentGenerator
{
  constructor()
  {
    this.generateDocx = this.generateDocx.bind(this);
  }

  public async generateDocx(request: Request, response: Response)
  {
    return response.status(200).send();
  }
}