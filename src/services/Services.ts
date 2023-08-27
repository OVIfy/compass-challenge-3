import Model from '../database/models/Model';
import RequestError from '../utils/RequestError';

abstract class Service<T extends Entity> {
  protected abstract _model: Model<T>;

  /**
   * Creates a database object.
   * @param object The properties of the object to be created.
   * @returns A copy of the created object.
   */
  async createOne(object: T): Promise<T> {
    return this._model.createOne(object);
  }

  /**
   * Find an object with .
   * @param id The id of the searched object.
   * @returns A list containing copies of the objects. Could be empty.
   */
  async findById(id: string): Promise<T> {
    const found = await this._model.findById(id);
    if (!found) throw RequestError.notFound(`Object with id ${id} was not found.`);
    return found;
  }

  /**
   * Finds all objects in the database.
   * @returns A list containing copies of the objects. Could be empty.
   */
  async findAll(): Promise<T[]> {
    return this._model.findAll();
  }

  /**
   * Updates a database object with passed values and returns it.
   * @param id The id of the object to be updated.
   * @param values The object containing the properties to be updated.
   * @throws An error if object doesn't exist.
   * @returns The updated object.
   */
  async updateOne(id: string, values: Partial<T>): Promise<T> {
    const updated = await this._model.updateOne(id, values);

    if (!updated) throw RequestError.notFound(`Object with id ${id} was not found.`);

    return updated;
  }

  /**
   * Deletes a database object and returns it.
   * @param id The id of the object to be deleted.
   * @throws An error if object doesn't exist.
   * @returns The deleted object.
   */
  async deleteOne(id: string): Promise<T> {
    const deleted = await this._model.deleteOne(id);

    if (!deleted) throw RequestError.notFound(`Object with id ${id} was not found.`);

    return deleted;
  }
}

export default Service;