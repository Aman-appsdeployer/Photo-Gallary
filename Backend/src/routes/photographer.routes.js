import express from "express";
import {
    addPhotographer,
    getPhotographerById,
    getPhotographers,
    updatePhotographer,
} from "../controllers/photographer.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyAdmin, addPhotographer);
router.get("/", verifyAdmin, getPhotographers);
router.get("/:id", verifyAdmin, getPhotographerById);
router.put("/:id", verifyAdmin, updatePhotographer);

export default router;
