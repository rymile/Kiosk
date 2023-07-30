const express = require("express");
const { Item } = require("../models");
const router = express.Router();

// 상품 생성
router.post("/Item", async (req, res) => {
  const { name, price, type } = req.body;

  const addItem = await Item.create({
    name,
    price,
    type,
  });
  return res.status(200).json({ data: addItem });
});

// 상품 조회
router.get("/Item", async (req, res) => {
  const getItem = await Item.findAll({
    attributes: ["itemId", "name", "price", "type", "createdAt", "updatedAt"],
    order: [["createdAt", "DESC"]],
  });
  return res.status(201).json({ data: getItem });
});

//상풍 상세조회
router.get("/Item/:itemId", async (req, res) => {
  const { itemId } = req.params;
  // 전체조회와 같은 부분
  const getItemdetail = await Item.findOne({
    attributes: ["itemId", "name", "price", "type", "createdAt", "updatedAt"],
    // 상세조회는 형식을 찾아와서 itemId 한번 더 찾아서 가져온다.
    where: { itemId },
  });
  return res.status(202).json({ data: getItemdetail });
});

// 상품 수정
router.put("/Item/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { name, price, type } = req.body;
  const modifyItem = await Item.findOne({ where: { itemId } });
  if (!modifyItem) {
    return res.status(404).json({ message: "상품이 존재하지 않습니다." });
  }

  await Item.update({ name, price, type }, { where: { itemId } });

  return res.status(203).json({ message: "상품이 수정되었습니다." });
});

// 상품 삭제
router.delete("/Item/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const Items = await Item.findOne({ where: { itemId } });
  if (!Items) {
    return res.status(404).json({ message: "상품이 존재하지 않습니다." });
  }
  await Item.destroy({ where: { itemId } });
  return res.status(204).json({ message: "상품이 삭제되었습니다." });
});

module.exports = router;
