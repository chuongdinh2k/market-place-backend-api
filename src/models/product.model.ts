import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes for ProductAttributes
export interface ProductAttributes {
  id: number;
  name: string;
  slug?: string;
  categoryId: number;
  description?: string | null;
  thumbnail?: string | null;
  price: number;
  image?: string | null;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductCreationAttributes = Optional<
  ProductAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public slug?: string;
  public categoryId!: number;
  public description?: string | null;
  public thumbnail?: string | null;
  public price!: number;
  public image?: string | null;
  public deletedAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export function initProductModel(sequelize: Sequelize): typeof Product {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "category_id",
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      tableName: "products",
      modelName: "Product",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  return Product;
}
