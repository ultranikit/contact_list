const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
        name:  {type: String, trim: true},
        phone:  {type: String, trim: true},
        details:   {type: String, trim: true},
    },
    //options
    {
        versionKey: false
    }
);

module.exports = mongoose.model('contacts', Contact, 'contacts');