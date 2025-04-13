import { Request, Response } from 'express';
import { Slot } from '../models/slotModel.js';

const createTimeSlots = (startHour: number, endHour: number, period: 'morning' | 'afternoon', initialMinute = 0) => {
	const slots = [];

	for (let hour = startHour; hour < endHour; hour++) {
		const startMinute = hour === startHour ? initialMinute : 0;
		const minuteLimit = hour === endHour - 1 ? initialMinute + 45 : 60;

		for (let minute = startMinute; minute < minuteLimit; minute += 15) {
			const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
			const endMinute = minute + 15;
			const endHourAdjusted = endMinute === 60 ? hour + 1 : hour;
			const adjustedMinute = endMinute === 60 ? 0 : endMinute;
			const endTime = `${endHourAdjusted.toString().padStart(2, '0')}:${adjustedMinute.toString().padStart(2, '0')}`;

			// Determine if slot is consumable (every 3rd slot is non-consumable)
			const slotCount = hour === startHour ? (minute - initialMinute) / 15 : minute / 15;
			const isConsumable = ((hour - startHour) * 4 + slotCount) % 3 !== 0;

			slots.push({
				startTime,
				endTime,
				isConsumable,
				maxBookings: isConsumable ? undefined : 10,
				period
			});
		}
	}

	return slots;
};

export const getAllSlots = async (req: Request, res: Response) => {
	try {
		const slots = await Slot.find();
		res.json(slots);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching slots', error });
	}
};

export const initializeSlots = async () => {
	try {
		const count = await Slot.countDocuments();
		if (count === 0) {
			const morningSlots = createTimeSlots(10, 15, 'morning');
			const afternoonSlots = createTimeSlots(15, 18, 'afternoon', 45);

			await Slot.insertMany([...morningSlots, ...afternoonSlots]);
			console.log('Successfully initialized time slots');
		}
	} catch (error) {
		console.error('Error initializing slots:', error);
	}
};
