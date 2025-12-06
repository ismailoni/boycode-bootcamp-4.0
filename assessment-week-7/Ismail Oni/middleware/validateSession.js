import exercises  from '../data/exercises.js';

export const validateSession = (req, res, next) => {
    if (req.body === undefined) {
        return res.status(400).json({
            status: 'fail',
            message: 'Request body is required.'
        });
    }
    const { exerciseId, reps, sets, note } = req.body;


    let errorMessages = [];

    const exerciseExists = exercises.find(exercise => exercise.id === exerciseId && !exercise.isDelete);

    if (!exerciseId || typeof exerciseId !== 'number' || !exerciseExists) {
        errorMessages.push('Valid exerciseId is required and must correspond to an existing exercise.');
    }

    if (!reps || typeof reps !== 'number' || reps <= 0) {
        errorMessages.push('Reps is required and must be a positive number.');
    }

    if (!sets || typeof sets !== 'number' || sets <= 0) {
        errorMessages.push('Sets is required and must be a positive number.');
    }

    if (note && (typeof note !== 'string' || note.trim() === '')) {
        errorMessages.push('If provided, note must be a non-empty string.');
    }

    if (errorMessages.length > 0) {
        return res.status(400).json({
            status: 'fail',
            message: errorMessages.join(' ')
        });
    }
    next();
}