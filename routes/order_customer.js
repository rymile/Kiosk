const express = require("express");
const { Item, Order_Customer, Item_Order_Customer } = require("../models");

class OrderCustomerRouter {
  constructor() {
    this.router = express.Router();
    this.router.post("/OrderCustomer", this.orderC.bind(this));
  }

  getOrderId() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000);
    const orderID = `${timestamp}-${randomNum}`;
    return orderID;
  }

  async orderC(req, res) {
    const orderID = this.getOrderId();
    const { itemId } = req.body;
    try {
      const orderItems = await Item.findAll({
        where: { itemId },
      });
      let totalPrice = 0;
      for (const item of orderItems) {
        totalPrice += item.price;
      }

      const orderDetails = await Order_Customer.create({
        orderID,
        totalPrice,
        amount: totalPrice,
        ItemId: itemId,
        state: false,
      });
      for (const item of orderItems) {
        await Item_Order_Customer.create({
          orderID: orderDetails.id,
          itemId: item.id,
        });
      }
      return res
        .status(201)
        .json({ orderID, totalPrice, message: "주문 완료" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 에러가 발생했습니다." });
    }
  }
}

module.exports = new OrderCustomerRouter().router;
