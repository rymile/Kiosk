"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Customer extends Model {
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
      this.hasMany(models.Order_Customer, {
        targetKey: "orderitemId",
        foreignKey: "OrderItemId",
      });
      this.hasMany(models.Item_Order_Customer, {
        targetKey: "orderitemId",
        foreignKey: "OrderItemId",
      });
    }
  }
  Order_Customer.init(
    {
      ordercustomerId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ItemId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      OrderItemId: {
        type: DataTypes.INTEGER,
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      state: {
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
      modelName: "Order_Customer",
    }
  );
  return Order_Customer;
};
