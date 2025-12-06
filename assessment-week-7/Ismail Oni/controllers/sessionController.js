import  sessions  from "../data/sessions.js";
import  generateId  from "../utils/generateId.js";

// Get all sessions
const activeSessions = sessions.filter(session => !session.isDelete);
export const getAllSessions = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: activeSessions.length,
        data: activeSessions
    });
}

// Create a new session
export const createSession = (req, res) => {
    const { exerciseId, reps, sets, note } = req.body;
    const newSession = {
        id: generateId(sessions),
        exerciseId,
        reps,
        sets,
        note,
        isDelete: false
    };
    sessions.push(newSession);
    res.status(201).json({
        status: 'success',
        data: newSession
    });
}

// Get session by ID
export const getSessionById = (req, res) => {
    const sessionId = parseInt(req.params.id, 10);
    const session = sessions.find(s => s.id === sessionId && !s.isDelete);
    if (!session) {
        res.status(404).json({
            status: 'fail',
            message: 'Session not found.'
        });
    } else if (session.isDelete === true) {
        res.status(410).json({
            status: 'fail',
            message: 'Session has been deleted.'
        });
    } else {
        res.status(200).json({
            status: 'success',
            data: session
        });
    }   
}

// Delete session by ID
export const deleteSessionById = (req, res) => {
    const sessionId = parseInt(req.params.id, 10);
    const sessionIndex = sessions.findIndex(s => s.id === sessionId && !s.isDelete);
    if (sessionIndex === -1) {
        res.status(404).json({
            status: 'fail',
            message: 'Session not found.'
        });
    } else {
        sessions[sessionIndex].isDelete = true;
        res.status(200).json({
            status: 'success',
            message: 'Session deleted successfully.'
        });
    }
}

// Get Sessions Summary
export const getSessionsSummary = (req, res) => {
    const summary = activeSessions.map(session => ({
        exerciseId: session.exerciseId,
        totalReps: session.reps * session.sets,
    }));
    res.status(200).json({
        status: 'success',
        data: summary
    });
}