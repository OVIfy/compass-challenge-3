import Joi from "joi";

export const eventJoiSchema = Joi.object({
    description : Joi.string().required(),
    dayOfWeek : Joi.string().valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday').required()
})

export const queryByDayorDescJoiSchema = Joi.object({
    description : Joi.string(),
    dayOfWeek : Joi.string().valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')
})

export const queryByDaySchema = Joi.object({
    dayOfWeek : Joi.string().valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')
})