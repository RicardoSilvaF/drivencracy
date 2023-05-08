import { Router } from "express";
import {  createChoice, createPoll, getChoices, getPolls } from "../controllers/controllers.js";
import { choiceSchema, pollSchema } from "../schemas/schemas.js";
import validateSchema from "../middlewares/middleware.js";

const router = Router();

router.post("/poll", validateSchema(pollSchema) ,createPoll);
router.get("/poll", getPolls);
router.post("/choice", validateSchema(choiceSchema) , createChoice);
router.get("/poll/:id/choice", getChoices);
router.post("/choice/:id/vote");
router.get("/poll/:id/result"); 

export default router;