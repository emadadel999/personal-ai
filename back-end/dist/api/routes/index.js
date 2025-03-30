"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiController_1 = require("../../controllers/aiController");
const router = express_1.default.Router();
router.route("/pull").get(aiController_1.pullModel);
router.route("/ask").get(aiController_1.ask);
exports.default = router;
