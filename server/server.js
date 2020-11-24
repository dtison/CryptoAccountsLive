const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });


  const getData = () => {
    var productList = [];
    for (let i = 0; i < 10; i++) {
        productList.push({ Id: i + 1, Title: `Product ${i + 1}`, Price: Math.floor(Math.random() * 100000) + 5000 });
    }
    return productList;
}


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//const stream = require("./routes/stream");

const app = express();

app.use(express.json());

app.get("/stream", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",

    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  });

  let eventInterval = setInterval(() => {
    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify(getData())}\n\n`);
  }, 2000);

  req.on("close", (err) => {
    clearInterval(eventInterval);
    res.end();
  });
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));