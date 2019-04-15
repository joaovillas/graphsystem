import express = require("express");
import { Request, Response } from "express";
import Grafo from "../models/Grafo";
const router = express.Router();

let grafo = new Grafo(); 

router.get("/grafo", (req: Request, res: Response) => {
    res.send()
});
export default router;