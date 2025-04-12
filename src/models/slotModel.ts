import mongoose, { Document, Schema } from 'mongoose';

interface IBooking {
	name: string;
	email: string;
	bookedAt: Date;
}

export interface ISlot extends Document {
	startTime: string;
	endTime: string;
	isConsumable: boolean;
	bookings: IBooking[];
	maxBookings?: number;
	period: string;
}

const bookingSchema = new Schema<IBooking>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	bookedAt: { type: Date, default: Date.now }
});

const slotSchema = new Schema<ISlot>({
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	isConsumable: { type: Boolean, required: true, default: true },
	bookings: [bookingSchema],
	maxBookings: { type: Number },
	period: { type: String, enum: ['morning', 'afternoon'], required: true }
});

export const Slot = mongoose.model<ISlot>('Slot', slotSchema);
