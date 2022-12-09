const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    contactName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactTelephone: {
        type: String,
        required: true
    },
    contactAddress: {
        type: String,
        required: true
    },
    contactGender: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ContactList', contactSchema)