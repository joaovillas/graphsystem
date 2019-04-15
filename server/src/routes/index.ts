import { Router } from "express";
import Grafo from './Grafo';

const router = Router();
router.use('/grafo',Grafo);
// we will add routes to this default router in future
export default router;
