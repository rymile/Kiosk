const express = require("express");
const ItemRouter = require("./routes/item");
const OrderRouter = require("./routes/order_item");
const app = express();
const port = 3005;

app.use(express.json());
app.use("/api", [ItemRouter, OrderRouter]);

app.listen(port, () => {
  console.log(port, "서버 실행");
});
