import Trivia from './../models/trivia.model.js';

const getTrivias = ((request, response, next) => {
    Trivia.find({ oculta: false }).exec()
        .then(data => {
            response.json(data);
        })
        .catch(next);
});

const getMyTrivias = ((request, response, next) => {
    const user = request.userId;

    Trivia.find({ user: user }).exec()
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
    const user = request.userId;

    const trivia = new Trivia({
        titulo: data.titulo,
        descripcion: data.descripcion,
        oculta: data.oculta,
        user: user,
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
    const user = request.userId;
    const id = request.params.id;

    Trivia.findByIdAndRemove({ _id: id, user: user }).exec()
        .then(data => {
            response.status(204).end();
        })
        .catch(next);

});

const uptdateTrivia = ((request, response, next) => {
    const id = request.params.id;
    const data = request.body;
    const user = request.userId;

    const newTriviaData = {
        titulo: data.titulo,
        descripcion: data.descripcion,
        es_privada: data.es_privada,
        preguntas: data.preguntas
    }

    Trivia.findOneAndUpdate(
        { _id: id, user: user },
        newTriviaData,
        { new: true }
    ).then(data => {
        if (data) {
            response.json(data);
        } else {
            response.status(404).end();
        }
    }).catch(next);

});

export { getTrivias, findTrivia, saveTrivia, removeTrivia, uptdateTrivia, getMyTrivias };