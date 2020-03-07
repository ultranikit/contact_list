const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3001;

const connectDB = require('./database');
//connect db
connectDB();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
    extended: true
}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());


const routeContactList = require('./routes/contacts.js');
app.use('/', routeContactList);


// app.use(express.static(path.join(__dirname, '../build')));
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../build/index.html')));
// app.use('*', (req, res) => res.sendFile(path.join(__dirname, '../contact-list/build/index.html')));


app.listen(port, () => {
    console.log('server start ar port: ' + port);
});