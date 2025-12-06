export const validateExercise = (req, res, next) => {
    if (req.body === undefined) {
        return res.status(400).json({
            status: 'fail',
            message: 'Request body is required.'
        });
    }

    const { name, category, difficulty } = req.body;

    const validCategories = ['strength', 'cardio', 'flexibility'];
    const validDifficulties = ['easy', 'medium', 'hard'];

    let errorMessages = [];

    if (!name || typeof name !== 'string' || name.trim() === '') {
        errorMessages.push('Name is required and must be a non-empty string.');
    }

    if (!category || !validCategories.includes(category.toLowerCase())) {
        errorMessages.push(`Category is required and must be one of the following: ${validCategories.join(', ')}.`);
    }

    if (!difficulty || !validDifficulties.includes(difficulty.toLowerCase())) {
        errorMessages.push(`Difficulty is required and must be one of the following: ${validDifficulties.join(', ')}.`);
    }

    if (errorMessages.length > 0) {
        return res.status(400).json({
            status: 'fail',
            message: errorMessages.join(' ')
        });
    }
    next();
}
