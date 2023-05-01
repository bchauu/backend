const mongoose = require("mongoose");
// const myURI =
//   "mongodb+srv://bryancee12:IZpNbQvm0k2ntWLV@cluster0.8pfsy4u.mongodb.net/Users?retryWrites=true&w=majority";

  const myURI =
  `mongodb+srv://bryancee12:IZpNbQvm0k2ntWLV@cluster0.8pfsy4u.mongodb.net/Users?retryWrites=true&w=majority`;


mongoose
  .connect(myURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection to Mongo DB successful."))
  .catch((err) => console.log(err));

const MovieSchema = new mongoose.Schema(
  {
    movie: { type: Object, required: true },
    user: { type: String, required: true },
  },
  { collection: "UserMovies" }
);

const MovieCountSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    movie: { type: Object, required: true },
    count: { type: Number, required: true },
  },
  { collection: "MovieCount" }
);

const MovieRatingSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    totalRating: { type: Number, required: true },
    movie: { type: Object, required: true },
    count: { type: Number, required: true },
    avgRating: { type: Number, required: false },
  },
  { collection: "MovieRatings" }
);

const MovieList = mongoose.model("Movies", MovieSchema);
const MovieCounts = mongoose.model("MovieCount", MovieCountSchema);
const MovieRatings = mongoose.model("MovieRatings", MovieRatingSchema);

module.exports = { MovieList, MovieCounts, MovieRatings };
