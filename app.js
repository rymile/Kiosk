const express = require("express");
const ItemRouter = require("./routes/item");
// const OrderRouter = require("./routes/order_item");
// const CustomerRouter = require("./routes/order_customer");

class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  setupMiddlewares() {
    this.app.use(express.json());
  }

  setupRoutes() {
    this.app.use("/api", [ItemRouter]);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`${this.port} 번호로 서버가 실행되었습니다.`);
    });
  }
}

const myServer = new Server(3005);
myServer.start();
