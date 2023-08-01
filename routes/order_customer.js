const express = require("express");
const { Item, Order_Customer } = require("../models");
const router = express.Router();

// 손님이 주문
router.post("/customer/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { amount, state, ordercustomerId } = req.body;

  const item = await Item.findOne({ where: { itemId } });
  if (!item) {
    return res.status(400).json({ message: "상품을 찾을 수 없습니다." });
  }

  const customer = await Order_Customer.create({
    ItemId: itemId,
    ordercustomerId,
    amount,
    state,
  });
  return res.status(200).json({ data: customer });
});

module.exports = router;
