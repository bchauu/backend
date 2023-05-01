const {
    MovieList,
    MovieCounts,
    MovieRatings,
  } = require("../models/MovieModel");
  const controller = {};
  
  controller.postMovieCount = (req, res, next) => {
    const { data } = req.body;
  
    MovieCounts.updateOne(
      { _id: data.tmdbId },
      { $setOnInsert: { movie: data }, $inc: { count: 1 } },
      { upsert: true }
    )
      .then((result) => {
        res.locals.result = result;
        return next();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  controller.postMovie = (req, res, next) => {
    const { data, user } = req.body;
  
    const addMovie = {
      movie: data,
      user: user,
    };
    MovieList.create(addMovie)
      .then((result) => {
        res.locals.result = result;
        return next();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  controller.postRating = (req, res, next) => {
    const { rating, movie } = req.body;
  
    MovieRatings.updateOne(
      { _id: movie.tmdbId },
      { $setOnInsert: { movie: movie }, $inc: { totalRating: rating, count: 1 } },
      { upsert: true }
    )
      .then((result) => {
        res.locals.result = result;
        return next();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  controller.getRating = (req, res, next) => {
    const { movie } = req.body;
  
    MovieRatings.find({ _id: movie.tmdbId }, (err, result) => {
      if (err) {
        return next(err);
      }
      res.locals.avgRating = result[0].totalRating / result[0].count;
      return next();
    });
  };
  
  controller.updateAvgRating = (req, res, next) => {
    const { movie } = req.body;
    const { avgRating } = res.locals;
  
    MovieRatings.updateOne(
      { _id: movie.tmdbId },
      { avgRating: avgRating },
      { upsert: true }
    )
      .then((result) => {
        res.locals.result = result;
        return next();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  controller.getMovies = (req, res, next) => {
    const { tagId } = req.params;
    console.log("retrieves from MovieList", tagId);
    MovieList.find({ user: tagId }, (err, result) => {
      console.log(result);
      if (err) {
        return next(err);
      }
      res.locals.allMovies = result;
      return next();
    });
  };
  
  controller.mostAdded = (req, res, next) => {
    MovieCounts.find({}, (err, result) => {
      if (err) {
        return next(err);
      }
      res.locals.mostAdded = result;
      return next();
    })
      .sort({ count: -1 })
      .limit(15); //negative to sort from descending order
  };
  
  controller.highestRatings = (req, res, next) => {
    MovieRatings.find({}, (err, result) => {
      if (err) {
        return next(err);
      }
      res.locals.highestRatings = result;
      return next();
    })
      .sort({ avgRating: -1 })
      .limit(15);
  };
  
  controller.deleteMessage = (req, res, next) => {
    const { data } = req.body;
    MovieList.findByIdAndDelete(data, (err, result) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  };
  
  module.exports = controller;
  