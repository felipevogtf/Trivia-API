const notFoundError = (request, response, next) => {
    response.status(404).end();
}

export default notFoundError;