const express = require("express")
const route = require("./routes/route");
const cors = require("cors");
const { config } = require("./config/config");

const app = express();
const port = 3000;

// const corsOptions = {
//     origin: config.FRONTEND_URL, // Update with your front-end domain
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Enable this if you need to include cookies in the requests
//     optionsSuccessStatus: 204,
// };

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', route);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});

