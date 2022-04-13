import { validationErrorMapper } from '../validation/validation-error-mapper.js';

export function validatorMiddleware(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });


        if (error && error.isJoi) {
            res.status(400).json(validationErrorMapper(error.details));
        } else {
            next();
        }
    };
}
