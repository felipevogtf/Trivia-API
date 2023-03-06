import Trivia from './../models/trivia.model.js';

const getTrivias = ((request, response, next) => {
    Trivia.find({}).exec()
        .then(data => {
            response.json(data);
        })
        .catch(next);
});

const findTrivia = ((request, response, next) => {

    const id = request.params.id;

    Trivia.findById(id).exec()
        .then(data => {
            if (data) {
                response.json(data);
            } else {
                response.status(404).end();
            }
        })
        .catch(next);

});

const saveTrivia = ((request, response, next) => {

    const data = request.body;

    const trivia = new Trivia({
        titulo: data.titulo,
        descripcion: data.descripcion,
        es_privada: data.es_privada,
        preguntas: data.preguntas
    });

    let hasErrors = trivia.validateSync();

    if (!hasErrors) {
        trivia.save().then(saved => {
            response.json(saved);
        }).catch(next);
    } else {
        next(hasErrors);
    }


});

const removeTrivia = ((request, response, next) => {

    const id = request.params.id;

    Trivia.findByIdAndRemove(id).exec()
        .then(data => {
            response.status(204).end();
        })
        .catch(next);

});

export { getTrivias, findTrivia, saveTrivia, removeTrivia };