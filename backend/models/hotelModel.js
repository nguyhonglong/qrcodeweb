import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    homeStay: {
        type: String,
        required: true,
    },
    roomID: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        default: "available"
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true
});

export const Hotel = mongoose.model('Hotel', roomSchema);
