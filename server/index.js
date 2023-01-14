const express = require("express");
const cors = require("cors");

const app = express();
const authRoute = require('./routes/auth');
const foodRoute = require('./routes/food');
const musicRoute = require('./routes/music');
const videoRoute = require('./routes/video');

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB started successfully");
  })
  .catch(err => {
    console.log("Cannot connect to the DB", err);
    process.exit();
});

app.use('/api/auth', authRoute);
app.use('/api/food', foodRoute);
app.use('/api/music', musicRoute);
app.use('/api/video', videoRoute);

// set port, listen for requests
const PORT = process.env.PORT || 2400;
app.listen(2400, () => {
  console.log(`Server started: ${PORT}.`);
});