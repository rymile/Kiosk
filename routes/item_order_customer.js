const express = require("express");
const { Item, Item_Order_Customer } = require("../models");

class ItemOrderRouter {
  constructor() {
    this.router = express.Router();
    this.router.post("/addOrder", this.addOrder.bind(this));
  }

  getOrderId() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000);
    const orderID = `${timestamp}-${randomNum}`;
    return orderID;
  }

  async addOrder(req, res) {
    const orderID = this.getOrderId;
    const { itemId } = req.body;
    try {
      const orderItems = await Item.findAll({
        where: { itemid: itemId },
      });
      let totalPrice = 0;
      for (const item of orderItems) {
        totalPrice += item.price;

        await Item_Order_Customer.create({
          itemId: item.id,
          OrderCustomerId: orderID,
          amount: 1,
        });
      }
      return res.status(200).json({
        orderID,
        totalPrice,
        message: "주문이 완료되었습니다.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  }
}
module.exports = new ItemOrderRouter().router;
