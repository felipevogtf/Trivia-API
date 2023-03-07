const handleError = (error, request, response, next) => {
    switch (error.name) {
        case 'CastError':
            response.status(400).send({
                errors: [
                    "id is malformed."
                ]
            })
            break;
        case 'ValidationError':
            const errorsMessages = Object.keys(error.errors).map(err => {
                return `${err}: ${error.errors[err].message}`;
            });

            response.status(400).send({
                errors: errorsMessages
            });
            break;
        case 'AuthError':
            response.status(400).send({
                errors: error.errors
            });
            break;
        default:
            response.status(500).end()
            break;
    }
};

export default handleError;