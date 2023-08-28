import Joi from "joi";

export const eventJoiSchema = Joi.object({
    description : Joi.string().required(),
    dayOfWeek : Joi.string().valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday').required()
})