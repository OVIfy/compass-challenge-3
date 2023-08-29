import { ErrorRequestHandler } from "express"

import {BadRequestError, InternalServerError, UnauthorizedError, NotFoundError, ValidationError} from'../errors/errors'
import { JsonWebTokenError } from "jsonwebtoken"
import { handleJwtError } from "../utils/jwtUtils"

export const errorHandler : ErrorRequestHandler = (err, req, res, next) => {
    if(err instanceof BadRequestError){
        return res.status(err.status).json({
            "statusCode": err.statusCode,
            "errors": [
              {
                "resource": err.resource,
                "message": err.message
              }
            ]
        })
    }

    if(err instanceof ValidationError){
      return res.status(err.status).json({
          "type": err.ty,
          "errors": [
            {
              "resource": err.resource,
              "message": err.message
            }
          ]
      })
  }

    if(err instanceof JsonWebTokenError){
      return res.status(401)
      .json({"statusCode": 401, "message" : err.message, "error": "Unauthorized"})
    }

    if(err instanceof UnauthorizedError){
      return res.status(err.status)
      .json({"statusCode": err.status, "message" : err.message, "error": "Unauthorized"})
    }

    if(err instanceof InternalServerError){
        return res.status(500)
        .json({ "statusCode": 500, "message": "Something went wrong", "error": "Internal server error"})
    }

    if(err instanceof NotFoundError){
      return res.status(err.status)
      .json({ "statusCode": 404, "message": err.message, "error": "Not Found"})
    }

    res.status(500)
    .json({ "statusCode": 500, "message": "Something went wrong", "error": "Internal server error"})
}
