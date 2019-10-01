const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://test:test@cluster0-uj202.mongodb.net/contactList?retryWrites=true&w=majority";

async function connectDB() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
