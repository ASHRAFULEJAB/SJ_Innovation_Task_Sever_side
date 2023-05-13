const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
app.use(cors());
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Coffeshop is runnning...");
});
app.listen(port, () => {
  console.log(`Coffeshop is running on ${port}`);
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dnw37y6.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const coffeshopCollection = client.db("coffeshopDB").collection("products");

    // Product home page
    app.get("/product-home", async (req, res) => {
      const query = {};
      const price = req.query.price;
      const cursor = coffeshopCollection.find(query).sort({ _id: -1 });
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });
    // Product menu page
    app.get("/products", async (req, res) => {
      const query = {};
      const price = req.query.price;
      const cursor = coffeshopCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
  } finally {
  }
}
run().catch(console.dir);
