import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes for ColorAttributes
export interface ColorAttributes {
  id: number;
  name: string;
  colorCode: string;
  description?: string;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ColorCreationAttributes = Optional<
  ColorAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class Color
  extends Model<ColorAttributes, ColorCreationAttributes>
  implements ColorAttributes
{
  public id!: number;
  public colorCode!: string;
  public name!: string;
  public deletedAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export function initColorModel(sequelize: Sequelize): typeof Color {
  Color.init(
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
      colorCode: {
        type: DataTypes.STRING(7),
        allowNull: false,
        unique: true,
        field: "color_code",
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      tableName: "colors",
      modelName: "Color",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  return Color;
}
