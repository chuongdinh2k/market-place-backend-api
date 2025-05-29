import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes for CategoryAttributes
export interface CategoryAttributes {
  id: number;
  slug: string;
  name: string;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CategoryCreationAttributes = Optional<
  CategoryAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public slug!: string;
  public name!: string;
  public deletedAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export function initCategoryModel(sequelize: Sequelize): typeof Category {
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      tableName: "categories",
      modelName: "Category",
      timestamps: true,
      underscored: true, // Ensures all fields use snake_case in DB
      paranoid: true, // Enables soft deletes using deletedAt
    }
  );
  return Category;
}
