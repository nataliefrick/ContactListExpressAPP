const express = require('express')
const router = express.Router()
const contactList = require('../models/contacts')


// create routes

// get all
router.get('/', async (req, res) => {
    try {
        const contact = await contactList.find()
        res.json(contact)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one
router.get('/:id', getAContact, async (req, res) => { res.json(res.log) })

// Create one
router.post('/', async (req, res) => {
    const contact = new contactList ({
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        contactTelephone: req.body.contactTelephone, 
        contactAddress: req.body.contactAddress, 
        contactGender: req.body.contactGender
    })
    try {
        const newContact = await contact.save()
        res.status(201).json(newContact)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }    
})
// update one
router.patch('/:id', getAContact, async (req, res) => {
    if (req.body.contactName != null ){
        res.log.contactName = req.body.contactName
    }
    if (req.body.contactEmail != null ){
        res.log.contactEmail = req.body.contactEmail
    }
    if (req.body.contactTelephone != null ){
        res.log.contactTelephone = req.body.contactTelephone
    }
    if (req.body.contactAddress != null ){
        res.log.contactAddress = req.body.contactAddress
    }
    if (req.body.contactGender != null ){
        res.log.contactGender = req.body.contactGender
    }

    try {
        const updatedContact = await res.log.save()
        res.json(updatedContact)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }

})

// delete one
router.delete('/:id', getAContact, async (req, res) => {
    try {
        await res.log.remove()
        res.json({ message : "Contact deleted"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

async function getAContact(req, res, next) {
    let log
    try {
        log = await contactList.findById(req.params.id)
        if (log == null) {
            return res.status(404).json({ message: "Cannot find that contact"})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.log = log
    next()
}

module.exports = router