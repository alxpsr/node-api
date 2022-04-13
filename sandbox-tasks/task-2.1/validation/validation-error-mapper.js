export function validationErrorMapper(schemaErrors) {
    const errors = schemaErrors.map(err => {
        let { path, message } = err;
        
        return {
            path,
            message,
        };
    });

    return {
        status: 'Failed',
        errors,
    }
}