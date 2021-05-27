const express = require("express");
var cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors())

const products = require("./products.json");
const product_details = require("./product.json");

//READ Request Handlers
app.get("/", (req, res) => {
  res.status(200).send({
    response: "OK",
    message: "E-Commerce Products API",
    "api-routes": {
      "all-products": "/api/products",
      "single-product": "/api/product/:id",
    },
  });
});

app.get("/api/products", (req, res) => {
  res.status(200).send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = product_details.find((prod) => prod.id === req.params.id);

  if (!product)
    res.status(404).send({
      response: "Not Fount",
      message: "Product Not Found!",
      "api-routes": {
        "all-products": "/api/products",
        "single-product": "/api/product/:id",
      },
    });
  res.status(200).send(product);
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`Running E-Commerce API Server on ${port}..`)
);
