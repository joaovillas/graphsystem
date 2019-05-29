import { Router } from "express";
import { graphRouter } from "./GraphRouter";

const router = Router();
router.use("/grafo", graphRouter);
// we will add routes to this default router in future
export default router;
