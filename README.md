## ***Movies search and favourite single-page wep app using NextJS and Express with MongoDB***

This project was made using NextJS and Express.


To run the server:

```
npm install
```

```
npm run server
```

To use the same server instance for NextJS and ExpressJS:


        const express = require('express')
        const next = require('next')
        const bodyParser = require("body-parser");
        const cors = require("cors");

        const port = parseInt(process.env.PORT, 10) || 3100
        const dev = process.env.NODE_ENV !== 'production'
        //Run Next and allow it to handle requests:
        const app = next({ dev })
        const handle = app.getRequestHandler()

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


Landing page:

![image](https://user-images.githubusercontent.com/58863081/121352448-eeb59e00-c93d-11eb-93fa-92de20b4fc4c.png)

Favorites page:

![image](https://user-images.githubusercontent.com/58863081/121352556-0c830300-c93e-11eb-83af-0d1215f12c27.png)

