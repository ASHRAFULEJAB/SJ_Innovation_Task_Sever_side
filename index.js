const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
app.use(cors());
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 5000;

const category = require("./db/category.json");
const products = require("./db/book.json");
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

    // servicess
    app.get("/product-home", async (req, res) => {
      const query = {};
      const price = req.query.price;
      const cursor = coffeshopCollection.find(query).sort({ _id: -1 });
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });

    app.get("/products", async (req, res) => {
      const query = {};
      const price = req.query.price;
      const cursor = coffeshopCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await coffeshopCollection.findOne(query);
      res.send(service);
    });
  } finally {
  }
}
run().catch(console.dir);
