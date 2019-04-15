"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Grafo_1 = __importDefault(require("./Grafo"));
const router = express_1.Router();
router.use('/grafo', Grafo_1.default);
// we will add routes to this default router in future
exports.default = router;
