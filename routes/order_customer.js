const express = require("express");
const { Item, Order_Customer, Item_Order_Customer } = require("../models");

class OrderCustomerRouter {
  constructor() {
    this.router = express.Router();
    //상품 주문 ID를 발급
    this.router.post("/OrderCustomer", this.orderC.bind(this));
    // 상품 주문
    this.router.post("/putOrder/:ordercustomerId", this.PutC.bind(this));
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

  async PutC(req, res) {
    const { ordercustomerId } = req.params;
    try {
      const order = await Order_Customer.findOne({
        where: { ordercustomerId },
        include: { model: Item },
      });

      if (!order) {
        res.status(400).json({ message: "주문을 찾을 수 없습니다." });
      }
      if (order.state === true) {
        return res.state(401).json({ message: "주문이 이미 존재합니다." });
      }
      order.state = true;

      return res.status(200).json({
        orderID: order.orderID,
        totalPrice: order.totalPrice,
        message: "주문이 수정되었습니다.",
      });

      // for (const item of order.Items) {
      //   const itemOrder = await Item_Order_Customer.findOne({
      //     where: { orderId: order.id, itemId: item.id },
      //   });

      //   if (itemOrder) {
      //     const quantity = itemOrder.amount;
      //     item.amount -= quantity;
      //     await item.save();
      //   }
      // }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 에러가 발생했습니다." });
    }
  }
}

module.exports = new OrderCustomerRouter().router;
