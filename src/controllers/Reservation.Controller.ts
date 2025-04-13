import { Request, Response } from 'express';
import {IBooking, Slot} from '../models/slotModel.js';

export const reserveSlot = async (req: Request, res: Response): Promise<void | Response> => {

	try {
		const { name, email, slotId } = req.body;
		console.log("slotId", slotId);

		const slot = await Slot.findById(slotId);
		if (!slot) {
			return res.status(404).json({ message: 'Slot not found' });
		}

		if (slot.isConsumable) {

			if (slot.bookings.length > 0) {
				return res.status(400).json({ message: 'This consumable slot is already booked' });
			}
		} else {

			if (slot.maxBookings && slot.bookings.length >= slot.maxBookings) {
				return res.status(400).json({ message: 'This non-consumable slot has reached maximum capacity' });
			}
		}

		slot.bookings.push({ name, email } as IBooking);
		await slot.save();

		const updatedSlots = await Slot.find();
		res.json(updatedSlots);
	} catch (error) {
		res.status(500).json({ message: 'Error reserving slot', error });
	}
};
