export function validationErrorMapper(schemaErrors) {
    const errors = schemaErrors.map(err => {
        const { path, message } = err;
        
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