const express = require('express')
const next = require('next')
const bodyParser = require("body-parser");
const cors = require("cors");

const port = parseInt(process.env.PORT, 10) || 3100
const dev = process.env.NODE_ENV !== 'production'
//Run Next and allow it to handle requests:
const app = next({ dev })
const handle = app.getRequestHandler()

//Connect to MongoDB:

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



app.prepare().then(() => {
  //Run express server 
  var corsOptions = {
    origin: "http://localhost:3100"
  };
  const server = express()
  server.use(cors(corsOptions));
  server.use(express.json());  
  server.use(express.urlencoded({extended: true}));  
  require("./routes/movies.routes")(server);

  //Redirect all other routes to Next requestHandler:
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  //Run server on Port:
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
