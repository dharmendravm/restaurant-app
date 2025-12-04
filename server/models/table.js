import mongoose from 'mongoose';

const tableSchema = mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true
    },
    qrSlug: {
        type: String,
        required: true,
    },
    qrCodeUrl: {
        type: String,
        required: true
    },
    sittingCapacity: {
        type: Number
    }


});

const Table = mongoose.model("Table", tableSchema);

export default Table;