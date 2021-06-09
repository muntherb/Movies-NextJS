module.exports = server => {
    const movies = require("../controllers/movies.controllers");
  
    var router = require("express").Router();
  
    // Create a new Customer
    router.post("/", movies.create);

    router.get("/", movies.findAll)

    router.delete("/", movies.deleteAll)

    router.post("/deleteById", movies.deletebyId)
  
    server.use('/api/movies', router);

  };