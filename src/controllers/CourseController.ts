import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";

export class CourseController
{
  constructor()
  {
    this.readById = this.readById.bind(this);
    this.searchByName = this.searchByName.bind(this);
    this.readAll = this.readAll.bind(this);
  }

  public async readById(request: Request, response: Response)
  {
    const { idCourse, } = request.params;

    const courses = await prismaClient.course.findFirst({
      where: {
        id: idCourse,
      },
    });

    return response.status(200).json({ courses, });
  }

  public async searchByName(request: Request, response: Response)
  {
    const query = request.query.name as string;

    const courses = await prismaClient.course.findMany({
      where: {
        name: {
          contains: query,
        },
      },
    });

    return response.status(200).json({ courses, });
  }

  public async readAll(request: Request, response: Response)
  {
    const courses = await prismaClient.course.findMany({});
    return response.status(200).json({ courses, });
  }
}