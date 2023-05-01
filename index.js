const express = require("express");
const controller = require("./controllers/messageController");
const cors = require("cors");

const app = express()
const PORT = 8000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

app.use(cors());

app.use(express.json({ limit: "5mb" })); //address payload too large
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.post("/addMovie", controller.postMovieCount, (req, res, next) => {
    next();
  });
  
  app.post("/addMovie", controller.postMovie, (req, res) => {
    return res.status(200).json(res.locals.result);
  });
  
  //updates rating and stores in res
  app.post(
    "/addRating",
    controller.postRating,
    controller.getRating,
    (req, res, next) => {
      next();
    }
  );


app.post("/addRating", controller.updateAvgRating, (req, res) => {
    return res.status(200).json(res.locals.result);
  });
  
  app.get("/getMovies/:tagId", controller.getMovies, (req, res) => {
    return res.status(200).json(res.locals.allMovies);
  });
  
  app.get("/mostAdded", controller.mostAdded, (req, res) => {
    return res.status(200).json(res.locals.mostAdded);
  });
  
  app.get("/highestRatings", controller.highestRatings, (req, res) => {
    return res.status(200).json(res.locals.highestRatings);
  });
  
  app.delete("/deleteMessage", controller.deleteMessage, (req, res) => {
    return res.status(200).json("Successfully deleted");
  });
  
  app.get((req, res) => res.sendStatus(404));
  



// Export the Express API
module.exports = app