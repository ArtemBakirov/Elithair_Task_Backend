import {RequestHandler, Router} from 'express';
import { getAllSlots} from '../controllers/Slot.Controller.js';
import { reserveSlot } from '../controllers/Reservation.Controller.js';

const router = Router();

router.get('/slots', getAllSlots);
router.post('/reserve', reserveSlot as RequestHandler);

export default router;
