import express from "express";
const router = express.Router();
// Importing Controller
import {
  getAllExercises,
  getExerciseById,
  getExerciseStats,
  createExercise,
  searchExercises,
  deleteExercise,
  fullyDeleteExercise,
  updateExercise,
  replaceExercise,
  restoreExercise,
} from "../controllers/exerciseController.js";
// Importing Validation Middleware
import { validateExercise } from "../middleware/validateExercise.js";

//Exercise Routes

// Get all exercises
router.get("/", getAllExercises);
// Search exercises wuth q parameter
router.get("/search", searchExercises);
// Get exercise statistics
router.get("/stats", getExerciseStats);
// Get exercise by ID
router.get("/:id", getExerciseById);
// Create a new exercise
router.post("/", validateExercise, createExercise);
// Update an existing exercise
router.put("/:id", validateExercise, replaceExercise);
// Partially update an existing exercise
router.patch("/:id", updateExercise);
// Soft delete an exercise
router.patch("/:id/delete", deleteExercise);
// Restore a soft-deleted exercise
router.patch("/:id/restore", restoreExercise);
// Fully delete an exercise
router.delete("/:id", fullyDeleteExercise);

export default router;
