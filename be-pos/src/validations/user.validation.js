import Joi from "joi";
// create
export const createSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required().messages({
        "string.empty": "Emailcannot be empty",
        "string.email": "The email format must be an email address",
        "string.required": "Email is required",
    }),
    password: Joi.string().regex(/^[0-9+]{7}-[0-9+]{1}$/).min(8).required().messages({
        "string.empty": "Password cannot be empty",
        "string.min": "Minimum length password is 8 characters",
        "string.required": "Password is required",
        "string.pattern.base": "The password must include uppercase letters, lowercase letters, numbers, and symbols!"
    }),
});

// update
export const updateSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required().messages({
        "string.empty": "Emailcannot be empty",
        "string.email": "The email format must be an email address",
        "string.required": "Email is required",
    }),
    password: Joi.string().regex(/^[0-9+]{7}-[0-9+]{1}$/).min(8).optinoanl().required().messages({
        "string.min": "Minimum length password is 8 characters",
        "string.pattern.base": "The password must include uppercase letters, lowercase letters, numbers, and symbols!"
    }),
});