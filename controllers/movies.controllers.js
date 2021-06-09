const db = require("../models");
const movies = db.movies

exports.create = (req, res) => {
    //Validate request
    console.log('hereee>>',req.body)
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
};
// Create a Movie
const movie = new movies(req.body);

  // Save Movie in the database
  movie
    .save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    });
};

//Delete all Movies
exports.deleteAll = (req, res) => {
    movies.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Favorites were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all favorites."
        });
      });
  }


exports.deletebyId = (req, res) => {
    movies.deleteOne({ "_id" : req.body.id })
    .then(data => {
      res.send({
        message: `${req.body.name} has been removed from favorites successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all favorites."
      });
    });
}


  exports.findAll = async(req, res) => {

    await movies.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving favorites."
        });
      });
  };