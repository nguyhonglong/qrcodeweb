import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    homestayName: {
        type: String
    },
    roomCode: {
        type: String,
        unique: true
    },
    checkInDate: {
        type: Date
    },
    checkOutDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Có sẵn', 'Đang cho thuê', 'Đang xử lý']
    },
    rentalPrice: {
        type: Number
    },
    renter: {
        type: String,

    },
    checkInPrice: {
        normalDay: {
            type: Number,
        },
        holiday: {
            type: Number,
        },
        weekend: {
            type: Number,
        }
    },
    checkInStaff: {
        type: String,

    }
}, {
    timestamps: true
});

export const Hotel = mongoose.model('Hotel', roomSchema);
