const authError = (message) => {
    const error = new Error(message);
    error.name = "AuthError";
    error.errors = [message];
    throw error;
}

const unauthorisedError = () => {
    const error = new Error("Unauthorised");
    error.name = "Unauthorised";
    throw error;
}

export {
    authError,
    unauthorisedError
}