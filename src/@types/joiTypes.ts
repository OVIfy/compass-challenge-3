import Joi from "joi";

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
    firstName : Joi.string(),
    lastName : Joi.string(),
    birthDate : Joi.string(),
    city : Joi.string(),
    country: Joi.string(),
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password : Joi.string(),
    confirmPassword : Joi.ref('password'),
}).and('password', 'confirmPassword')

export const userSignInSchema = Joi.object({
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password : Joi.string().required()
})

