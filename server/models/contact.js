const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
        name: {type: String, trim: true},
        phone: {type: String, trim: true},
        details: {type: String, trim: true},
        favorite: {type: Boolean, default: false}
    },
    {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: {
            currentTime: () => Math.floor(Date.now() / 1000)
        }
    },
//options
    {
        versionKey: false
    }
    )
;

module.exports = mongoose.model('contacts', Contact, 'contacts');