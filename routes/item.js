const express = require("express");
const { Item } = require("../models");

class ItemRouter {
  constructor() {
    this.router = express.Router();
    this.router.post("/Item", this.addItem.bind(this));
    this.router.get("/Item", this.getItem.bind(this));
    this.router.get("/Item/:type", this.getItemType.bind(this));
    this.router.delete("/Item/:itemId", this.removeItem.bind(this));
  }

  // 상품 생성
  async addItem(req, res) {
    const { name, price, type } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "이름과 가격을 지정해주세요" });
    }

    try {
      const authType = ["COFFEE", "JUICE"];
      if (!authType.includes(type)) {
        res.status(401).json({ message: "상품의 타입이 올바르지 않습니다." });
      }

      const NewProduct = await Item.create({
        name,
        price,
        type,
      });

      NewProduct.amount = 0;
      await NewProduct.save();

      NewProduct.amount += 1;
      await NewProduct.save();

      return res.status(201).json({
        message: "상품 생성 완료",
        product: NewProduct,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  }
  // 상품 전체조회
  async getItem(req, res) {
    try {
      const products = await Item.findAll({
        attributes: [
          "itemId",
          "name",
          "price",
          "type",
          "createdAt",
          "updatedAt",
        ],
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json({ data: products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  }
  // 상품 타입별 조회
  async getItemType(req, res) {
    const { type } = req.params;
    try {
      const productType = await Item.findAll({
        attributes: [
          "itemId",
          "name",
          "price",
          "type",
          "createdAt",
          "updatedAt",
        ],
        where: { type },
      });
      return res.status(201).json({ data: productType });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  }
  async removeItem(req, res) {
    const { itemId } = req.params;

    try {
      const product = await Item.findOne({
        where: { itemId },
      });

      if (!product) {
        res.status(402).json({ message: "상품을 찾을 수 없습니다." });
      }

      await product.destroy();
      return res.status(204).json({ message: "상품 삭제를 완료하였습니다." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  }
}

// // 상품 생성
// router.post("/Item", async (req, res) => {
//   const { name, price, type } = req.body;

//   const addItem = await Item.create({
//     name,
//     price,
//     type,
//   });
//   return res.status(200).json({ data: addItem });
// });

// // 상품 조회
// router.get("/Item", async (req, res) => {
//   const getItem = await Item.findAll({
//     attributes: ["itemId", "name", "price", "type", "createdAt", "updatedAt"],
//     order: [["createdAt", "DESC"]],
//   });
//   return res.status(201).json({ data: getItem });
// });

// //상풍 상세조회
// router.get("/Item/:itemId", async (req, res) => {
//   const { itemId } = req.params;
//   // 전체조회와 같은 부분
//   const getItemdetail = await Item.findOne({
//     attributes: ["itemId", "name", "price", "type", "createdAt", "updatedAt"],
//     // 상세조회는 형식을 찾아와서 itemId 한번 더 찾아서 가져온다.
//     where: { itemId },
//   });
//   return res.status(202).json({ data: getItemdetail });
// });

// // 상품 수정
// router.put("/Item/:itemId", async (req, res) => {
//   const { itemId } = req.params;
//   const { name, price, type } = req.body;
//   const modifyItem = await Item.findOne({ where: { itemId } });
//   if (!modifyItem) {
//     return res.status(404).json({ message: "상품이 존재하지 않습니다." });
//   }

//   await Item.update({ name, price, type }, { where: { itemId } });

//   return res.status(203).json({ message: "상품이 수정되었습니다." });
// });

// // 상품 삭제
// router.delete("/Item/:itemId", async (req, res) => {
//   const { itemId } = req.params;
//   const Items = await Item.findOne({ where: { itemId } });
//   if (!Items) {
//     return res.status(404).json({ message: "상품이 존재하지 않습니다." });
//   }
//   await Item.destroy({ where: { itemId } });
//   return res.status(204).json({ message: "상품이 삭제되었습니다." });
// });

module.exports = new ItemRouter().router;
