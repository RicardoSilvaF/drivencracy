import { Router } from "express";
import { createPoll, getPolls } from "../controllers/controllers.js";
import { pollSchema } from "../schemas/schemas.js";
import validateSchema from "../middlewares/middleware.js";

const router = Router();

router.post("/poll", validateSchema(pollSchema) ,createPoll);
router.get("/poll", getPolls);
router.post("/choice");
router.get("/poll/:id/choice");
router.post("/choice/:id/vote");
router.get("/poll/:id/result"); 

export default router;