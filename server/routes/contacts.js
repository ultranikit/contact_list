const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.get('/contacts', async (req, res) => {
    const contacts = await Contact.find({});
    res.send(contacts)
});

router.post('/add-contact', async (req, res) => {
    let contact = new Contact(req.body.new_contact);
    await contact.save((err) => {
        if (err) return console.error(err);
        res.json({created: true, new_contact: contact});
    })
});

router.put('/update-contact', async (req, res) => {
    try {
        const updatedContact = req.body.updatedContact;
        const contactID = req.body.updatedContact._id;
        const updated = await Contact.findOneAndUpdate({_id: contactID}, updatedContact, {new: true})
        res.send({updatedContact: updated, updated: true});
    } catch (e) {
        res.send({updated: false});
    }
});

router.delete('/delete-contact', async (req, res) => {
    let contact = req.body.contact;
    await Contact.findOneAndDelete({_id: contact._id},
        (err) => {
            if (err) return res.send({deleted: false});
            res.send({deleted: true});
        })
});

module.exports = router;