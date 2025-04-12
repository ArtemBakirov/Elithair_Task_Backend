import { Request, Response } from 'express';
import { Slot } from '../models/slotModel.js';

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
			// Create time slots from 10:00 AM to 3:00 PM in 15-minute intervals
			const slots = [];

			// First period: 10:00 AM - 3:00 PM
			let startHour = 10;
			let endHour = 15; // 3:00 PM

			for (let hour = startHour; hour < endHour; hour++) {
				for (let minute = 0; minute < 60; minute += 15) {
					const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
					const endMinute = minute + 15;
					const endHourAdjusted = endMinute === 60 ? hour + 1 : hour;
					const adjustedMinute = endMinute === 60 ? 0 : endMinute;
					const endTime = `${endHourAdjusted.toString().padStart(2, '0')}:${adjustedMinute.toString().padStart(2, '0')}`;

					const isConsumable = (hour * 4 + minute / 15) % 3 !== 0;

					slots.push({
						startTime,
						endTime,
						isConsumable,
						maxBookings: isConsumable ? undefined : 10,
						period: 'morning'
					});
				}
			}

			startHour = 15;
			endHour = 18;


			for (let hour = startHour; hour < endHour; hour++) {
				// Start at 45 minutes for the first slot (3:45)
				const startMinute = hour === 15 ? 45 : 0;

				for (let minute = startMinute; minute < 60 && (hour < endHour - 1 || minute <= 45); minute += 15) {
					const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
					const endMinute = minute + 15;
					const endHourAdjusted = endMinute === 60 ? hour + 1 : hour;
					const adjustedMinute = endMinute === 60 ? 0 : endMinute;
					const endTime = `${endHourAdjusted.toString().padStart(2, '0')}:${adjustedMinute.toString().padStart(2, '0')}`;

					// Make every 3rd slot non-consumable
					const slotCount = hour === 15 ? (minute - 45) / 15 : minute / 15;
					const isConsumable = ((hour - 15) * 4 + slotCount) % 3 !== 0;

					slots.push({
						startTime,
						endTime,
						isConsumable,
						maxBookings: isConsumable ? undefined : 10,
						period: 'afternoon'
					});
				}
			}




			await Slot.insertMany(slots);
			console.log('Initialized time slots');
		}
	} catch (error) {
		console.error('Error initializing slots:', error);
	}
};

export const deleteAllSlots = async () => {
	try {
		await Slot.deleteMany({}); // Delete all slots
		console.log('Deleted all time slots');
	} catch (error) {
		console.error('Error deleting slots:', error);
	}
};
