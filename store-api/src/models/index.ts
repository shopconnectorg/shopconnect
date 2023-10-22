import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

// Create database, ensure 'sqlite3' in your package.json
var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
});

// order of InferAttributes & InferCreationAttributes is important.
class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare status: string;
  declare subtotal: number;
  declare total: number;
  declare promotionData: string;

  // timestamps
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: new DataTypes.STRING
    },
    subtotal: {
      type: new DataTypes.FLOAT,
      allowNull: false
    },
    total: {
      type: new DataTypes.FLOAT,
      allowNull: false
    },
    promotionData: {
      type: new DataTypes.TEXT,
      allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'orders',
    sequelize // passing the `sequelize` instance is required
  }
);

Order.sync();

export {
  sequelize,
  Order
};
