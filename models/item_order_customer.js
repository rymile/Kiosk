"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item_Order_Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Item, {
        targetKey: "itemId",
        foreignKey: "ItemId",
      });
      this.belongsTo(models.Order_Customer, {
        targetKey: "ordercustomerId",
        foreignKey: "OrderCustomerId",
      });
    }
  }
  Item_Order_Customer.init(
    {
      ItemId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      OrderCustomerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Item_Order_Customer",
    }
  );
  return Item_Order_Customer;
};
