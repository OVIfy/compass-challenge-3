import { Request, RequestHandler, Response } from 'express';
import codes from 'http-status-codes';
import { Entity } from '../@types/Entity';
import Service from '../services/Services';



export abstract class Controller{
  async create(req:Request , res:Response){

  }
}

export default Controller;