import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes for InventoryAttributes
export interface InventoryAttributes {
  id: number;
  productId: number;
  storeId: number;
  colorId: number;
  sizeId: number;
  amount: number;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type InventoryCreationAttributes = Optional<
  InventoryAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class Inventory
  extends Model<InventoryAttributes, InventoryCreationAttributes>
  implements InventoryAttributes
{
  public id!: number;
  public productId!: number;
  public storeId!: number;
  public colorId!: number;
  public sizeId!: number;
  public amount!: number;
  public deletedAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export function initInventoryModel(sequelize: Sequelize): typeof Inventory {
  Inventory.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "product_id",
      },
      storeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "store_id",
      },
      colorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "color_id",
      },
      sizeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "size_id",
      },
      amount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      tableName: "inventories",
      modelName: "Inventory",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  return Inventory;
}
