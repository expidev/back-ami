const express = require("express")
const route = require("./routes/route");
const authRoute = require("./routes/authRoute");
const passport = require('passport');
const session = require('express-session')
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ 
    secret: 'secret', 
    resave: false, 
    saveUninitialized: false
 }));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfiguration");

app.use('/', authRoute);
app.use('/', route);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});