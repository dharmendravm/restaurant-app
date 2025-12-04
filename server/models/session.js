import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema({
    sessionToken: {
        type: String,
        default: null
    },
    deviceId: {
        type: String,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userAgent:{
        type: String
    },
    tableNumber: {
        type: Number
    },
    qrCodeUrl: {
        type: String
    },
    convertedSession: {
        type: Boolean,
        default: null
    },
    lastActivity: {
        type: Date
    }
});

const Session = mongoose.model('Session',sessionSchema);

export default Session;