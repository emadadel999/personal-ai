import express from 'express';

import { pullModel, ask } from "../../controllers/aiController";

const router = express.Router();

router.route("/pull").get(pullModel);
router.route("/ask").get(ask);

export default router;
