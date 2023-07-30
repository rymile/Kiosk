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
router.get("/order", async (req, res) => {
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
  // 댓글이 잘 조회되었을 경우 Order_Item 정보를 보여준다.
  return res.status(200).json({ data: getOrder });
});
module.exports = router;
