const express = require("express");
const { Items } = require("../models");
const router = express.Router();

// 상품 생성
router.post("/Item", async (req, res) => {
  const { name, price, type } = req.body;

  const addItem = await Items.create({
    name,
    price,
    type,
  });
  return res.status(200).json({ data: addItem });
});

// 상품 조회

// 상품 수정

// 상품 삭제

module.exports = router;
