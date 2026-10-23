import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required().messages({
        "string.empty": "Emailcannot be empty",
        "string.email": "The email format must be an email address",
        "string.required": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Password cannot be empty",
        "string.min": "Minimum length password is 8 characters",
        "string.required": "Password is required",
        "string.pattern.base": "Password harus ada huruf besar, huruf kecil, angka, dan simbol!"
    }),
});