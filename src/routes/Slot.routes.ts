import { Router } from 'express';
import {deleteAllSlots, getAllSlots} from '../controllers/Slot.Controller.js';
import { reserveSlot } from '../controllers/Reservation.Controller.js';

const router = Router();

router.get('/slots', getAllSlots);
router.get('/slotsDelete', deleteAllSlots);
router.post('/reserve', reserveSlot);

export default router;
