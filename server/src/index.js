const express = require("express");
const app = express();
const cors = require('cors')
const personRouter = require('./controllers/PersonController')
const helmet = require("helmet");
const morgan = require("morgan");
const path = require('path');
require("dotenv").config();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '../../client/build')));
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"))
});

app.listen(PORT, () => {
  console.log(`körs på ${PORT}`)
})

//app.use(morgan('combined'))
app.use(morgan(":method :url :response-time"));

app.use(cors())
app.use(helmet());
app.use(express.json())
app.use('/persons', personRouter)


morgan.token("id", function getId(req) {
  return req.id;
});

