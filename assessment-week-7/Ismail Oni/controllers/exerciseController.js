import exercises from '../data/exercises.js';
import  generateId  from '../utils/generateId.js';

// Get all exercises
export const getAllExercises = (req, res) => {
    let filteredExercises = exercises.filter(exercise => !exercise.isDelete);

    if (req.query.category) {
        const category = req.query.category;
        filteredExercises = filteredExercises.filter(exercise => exercise.category.toLowerCase() === category.toLowerCase());
    }

    if (req.query.difficulty) {
        const difficulty = req.query.difficulty;
        filteredExercises = filteredExercises.filter(exercise => exercise.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (req.query['duration[lte]']) {
        const maxDuration = parseInt(req.query['duration[lte]'], 10);
        filteredExercises = filteredExercises.filter(exercise => exercise.duration <= maxDuration);
    }

    if (req.query.sort) {
        const sortField = req.query.sort;
        if (sortField === 'difficulty') {
            filteredExercises.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
        } else if (sortField === 'category') {
            filteredExercises.sort((a, b) => a.category.localeCompare(b.category));
        } else if (sortField === 'name') {
            filteredExercises.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    if (req.query.limit && req.query.page) {
        const limit = parseInt(req.query.limit, 10);
        const page = parseInt(req.query.page, 10);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        filteredExercises = filteredExercises.slice(startIndex, endIndex);
    }

    if (filteredExercises.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'No exercises found matching the criteria.'
        });
    }   

    res.status(200).json({
        status: 'success',
        results: filteredExercises.length,
        data: filteredExercises
    });

};

//Search exercises
export const searchExercises = (req, res) => {
    const searchQuery = req.query.q;
    if (!searchQuery) {
        return res.status(400).json({
            status: 'fail',
            message: 'Search query parameter "q" is required.'
        });
    }
    const matchedExercises = exercises.filter(exercise => 
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (matchedExercises.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'No exercises found matching the search criteria.'
        });
    }

    res.status(200).json({
        status: 'success',
        results: matchedExercises.length,
        data: matchedExercises
    });
}

// Get exercise by ID
export const getExerciseById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const exercise = exercises.find(ex => ex.id === id);
    if (!exercise) {
        return res.status(404).json({
            status: 'fail',
            message: 'Exercise not found.'
        });
    }
    
    if (exercise.isDelete === true) {
        return res.status(410).json({
            status: 'fail',
            message: 'Exercise has been deleted.'
        });
    }

    res.status(200).json({
        status: 'success',
        data: exercise
    });
}

//Get exercises stats
export const getExerciseStats = (req, res) => {
    const totalExercises = exercises.length;
    const byCategory = {};
    const byDifficulty = {};
    exercises.forEach(exercise => {
        if (!byCategory[exercise.category]) {
            byCategory[exercise.category] = 0;
        }
        byCategory[exercise.category] += 1;

        if (!byDifficulty[exercise.difficulty]) {
            byDifficulty[exercise.difficulty] = 0;
        }
        byDifficulty[exercise.difficulty] += 1;
    });
    res.status(200).json({
        status: 'success',
        data: { 
            totalExercises,
            byCategory,
            byDifficulty
        }
    });
};
// Create a new exercise
export const createExercise = (req, res) => {

    const { name, category, difficulty, duration } = req.body;

    const newExercise = {
        id: generateId(exercises),
        name,
        category,
        difficulty,
        duration,
        isDelete: false
    };

    exercises.push(newExercise);

    res.status(201).json({
        status: 'success',
        data: newExercise
    });
};


// Update an existing exercise (Patch)
export const updateExercise = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const exercise = exercises.find(ex => ex.id === id);

    if (!exercise) {
        return res.status(404).json({
            status: 'fail',
            message: 'Exercise not found.'
        });
    }

    if (exercise.isDelete === true) {
        return res.status(410).json({
            status: 'fail',
            message: 'Exercise has been deleted.'
        });
    }

    const updatedExercise = { ...exercise, ...req.body };

    res.status(200).json({
        status: 'success',
        data: updatedExercise
    });
};

// Update an existing exercise (Put)
export const replaceExercise = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const exerciseIndex = exercises.findIndex(ex => ex.id === id);
    if (exerciseIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Exercise not found.'
        });
    }

    if (exercises[exerciseIndex].isDelete === true) {
        return res.status(410).json({
            status: 'fail',
            message: 'Exercise has been deleted.'
        });
    }

    const { name, category, difficulty, duration } = req.body;

    const replacedExercise = {  
        id,
        name,
        category,
        difficulty,
        duration
    };

    exercises[exerciseIndex] = replacedExercise;

    res.status(200).json({
        status: 'success',
        data: replacedExercise
    });
};

// Delete an exercise (Soft Delete)
export const deleteExercise = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const exercise = exercises.find(ex => ex.id === id);
    if (!exercise) {
        return res.status(404).json({
            status: 'fail',
            message: 'Exercise not found.'
        });
    }
    exercise.isDelete = true;
    res.status(200).json({
        status: 'success',
        message: 'Exercise deleted successfully.'
    });
};

// Restore a deleted exercise
export const restoreExercise = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const exercise = exercises.find(ex => ex.id === id);
    if (!exercise) {
        return res.status(404).json({
            status: 'fail',
            message: 'Exercise not found.'
        });
    }
    exercise.isDelete = false;
    res.status(200).json({
        status: 'success',
        message: 'Exercise restored successfully.'
    });
};

// Fully delete an exercise
export const fullyDeleteExercise = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const exerciseIndex = exercises.findIndex(ex => ex.id === id);
    if (exerciseIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Exercise not found.'
        });
    }   
    exercises.splice(exerciseIndex, 1);
    res.status(200).json({
        status: 'success',
        message: 'Exercise permanently deleted.'
    });
};

