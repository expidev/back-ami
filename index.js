const express = require("express")
const route = require("./routes/route");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', route);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});