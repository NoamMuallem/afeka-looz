const path = require("path");
//my tools for getting and proccessing data
const scrape = require("./src/utils/data-scrapper");
const sort = require("./src/utils/sort-lectures");
//express
const express = require(`express`);
const cors = require("cors");
//for env file
require("dotenv").config();

//setting up app
const app = express();
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

app.get("/courses/:id", async (req, res) => {
  const courseNumber = req.params.id;
  const data = await scrape(courseNumber);

  data.length == 0
    ? res.status(404).send({ error: "wrong number" })
    : res.send(sort(data));
});

//server static assets if in production:
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.relative(__dirname, "client", "build", "index.html"));
  });
}

const server = app.listen(port, () => {
  console.log(`server is up on port ` + port);
});
server.setTimeout(900000);
