import Joi from "joi";
import { User } from "../schema/userSchema";

export const userJoiSchema = Joi.object({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    birthDate : Joi.string().required(),
    city : Joi.string().required(),
    country: Joi.string().required(),
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password : Joi.string().required(),
    confirmPassword : Joi.ref('password'),
})

export const updateUserJoiSchema = Joi.object({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    birthDate : Joi.string().required(),
    city : Joi.string().required(),
    country: Joi.string().required(),
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password : Joi.string().required(),
    confirmPassword : Joi.ref('password'),
}).and('password', 'confirmPassword')

