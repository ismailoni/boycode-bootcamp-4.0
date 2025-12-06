import express from 'express';
const router = express.Router();
// Importing Controller
import {
  createSession,
  getAllSessions,
    getSessionById,
    deleteSessionById,
    getSessionsSummary
} from '../controllers/sessionController.js';
// Importing Validation Middleware
import { validateSession } from '../middleware/validateSession.js';

// Session Routes

// Get all sessions
router.get('/', getAllSessions);

// Get session by ID
router.get('/:id', getSessionById);

// Create new session
router.post('/', validateSession, createSession);

// Delete session by ID
router.delete('/:id', deleteSessionById);

// Get sessions summary
router.get('/summary', getSessionsSummary);

export default router;
