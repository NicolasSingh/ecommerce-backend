const express = require("express");
const app = express();
const cors = require("cors");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const orderRoutes = require("./routes/order.routes");

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use([userRoutes, productRoutes, categoryRoutes, orderRoutes]);

module.exports = app;
