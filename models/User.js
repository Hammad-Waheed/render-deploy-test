const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    sex: { type: String, required: true },
    address: {
        houseNumber: { type: String, required: true },
        street: { type: String, required: true },
        townCity: { type: String, required: true },
        county: { type: String, required: true },
        country: { type: String, required: true },
        postcode: { type: String, required: true }
      },
    role: { type: String, enum: ['admin', 'subadmin', 'employee', 'user'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
