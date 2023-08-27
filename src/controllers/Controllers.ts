import { RequestHandler } from 'express';
import codes from 'http-status-codes';
import { Entity } from '../@types/Entity';
// import Service from '../services/Service';



abstract class Controller<T extends Entity> {
//   protected abstract _service: Service<T>;

  create: RequestHandler = async (req, res) => {
    // const { body } = req;
    // const created = await this._service.createOne(body as T);
    // res.status(codes.CREATED).json(created);
  };

  findById: RequestHandler = async (req, res) => {
    // const { params: { id } } = req;
    // const found = await this._service.findById(id);
    // res.status(codes.OK).json(found);
  };

  findAll: RequestHandler = async (_req, res) => {
    // const all = await this._service.findAll();
    // res.status(codes.OK).json(all);
  };

  updateOne: RequestHandler = async (req, res) => {
    // const { body, params: { id } } = req;
    // const updated = await this._service.updateOne(id, body as Partial<T>);
    // return res.status(codes.OK).json(updated);
  };

  deleteOne: RequestHandler = async (req, res) => {
    // const { params: { id } } = req;
    // await this._service.deleteOne(id);
    // res.status(codes.NO_CONTENT).json({ message: 'Object successfully deleted.' });
  };
}

export default Controller;