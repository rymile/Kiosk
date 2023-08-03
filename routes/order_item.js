const express = require("express");
const { Item, Order_Item } = require("../models");
const router = express.Router();

//주문 생성
router.post("/order/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { amount, state } = req.body;

  const item = await Item.findOne({ where: { itemId } });
  if (!item) {
    return res.status(400).json({ message: "상품을 찾을 수 없습니다." });
  }

  const order = await Order_Item.create({
    ItemId: itemId,
    amount,
    state,
  });
  return res.status(200).json({ data: order });
});

//주문조회
router.get("/order/", async (req, res) => {
  // Order_Item 테이블에서 참조하는 모든 필요한 정보를 찾는다.
  const getOrder = await Order_Item.findAll({
    attributes: [
      "orderItemId",
      "ItemId",
      "amount",
      "state",
      "createdAt",
      "updatedAt",
    ],
    // 내림차순으로 정렬
    order: [["createdAt", "DESC"]],
  });
  // 상품이 잘 조회되었을 경우 Order_Item 정보를 보여준다.
  return res.status(200).json({ data: getOrder });
});

// // state 변경을 위한 조회로직
// router.get("/order/:orderItemId", async (req, res) => {
//   const { orderItemId } = req.params;
//   const order = await Order_Item.findOne({ where: { orderItemId } });
//   if (!order) {
//     return res.status(401).json({ message: "주문을 찾을 수 없습니다." });
//   }
//   return res.status(200).json({ data: order });
// });

// 주문 수정
router.put("/order/:orderItemId", async (req, res) => {
  const { orderItemId } = req.params;
  const { state } = req.body;

  const order = await Order_Item.findOne({ where: { orderItemId } });
  if (!order) {
    return res.status(402).json({ message: "주문을 찾을 수 없습니다." });
  }

  await Order_Item.update({ state }, { where: { orderItemId } });

  return res.status(202).json({ message: "주문 상태가 수정되었습니다." });
});

// 주문 amount값 조절
router.patch("/order/:orderItemId", async (req, res) => {
  const { orderItemId } = req.params;
  const { amount } = req.body;

  const order = await Order_Item.findOne({ where: { orderItemId } });
  if (!order) {
    return res.status(404).json({ message: "주문을 찾을 수 없습니다." });
  }

  // 현재 amount 값
  const currentAmount = order.amount;
  // 새로운 amount 값
  let newAmount = currentAmount + amount;

  // 최소값 0, 최대값 5로 제한
  if (newAmount < 0) {
    newAmount = 0;
  } else if (newAmount > 5) {
    newAmount = 5;
  }

  await Order_Item.update({ amount: newAmount }, { where: { orderItemId } });

  return res
    .status(200)
    .json({ message: "주문 수량이 수정되었습니다.", data: { newAmount } });
});

module.exports = router;
