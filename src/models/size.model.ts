import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes for SizeAttributes
export interface SizeAttributes {
  id: number;
  name: string;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SizeCreationAttributes = Optional<
  SizeAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class Size
  extends Model<SizeAttributes, SizeCreationAttributes>
  implements SizeAttributes
{
  public id!: number;
  public name!: string;
  public deletedAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export function initSizeModel(sequelize: Sequelize): typeof Size {
  Size.init(
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
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      tableName: "sizes",
      modelName: "Size",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  return Size;
}
