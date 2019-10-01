const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.get('/contacts', async (req, res) => {
    const contacts = await Contact.find({});
    res.send(contacts)
});

router.post('/add-contact', async (req, res) => {
    console.log(req.body.new_contact);
    let contact = new Contact(req.body.new_contact);
    console.log(contact);
    await contact.save((err) => {
        if (err) return console.error(err);
        console.log(contact);
        res.json( { created: true,  new_contact: contact});
    })
});

router.delete('/delete-contact', async (req, res) => {
    let contact = req.body.contact;
    console.log(contact._id);
    await Contact.findOneAndDelete({_id: contact._id},
        (err) => {
        if (err) return res.send({deleted: false});
        res.send({deleted: true});
        })
});

module.exports = router;