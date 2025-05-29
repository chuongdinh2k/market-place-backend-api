import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes for StoreAttributes
export interface StoreAttributes {
  id: number;
  name: string;
  address: string;
  slug: string;
  phone: string;
  email?: string;
  description?: string;
  logo?: string;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type StoreCreationAttributes = Optional<
  StoreAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export type StoreUpdateAttributes = {
  id: number;
} & Partial<Omit<StoreAttributes, "id">>;

export class Store
  extends Model<StoreAttributes, StoreCreationAttributes>
  implements StoreAttributes
{
  public id!: number;
  public name!: string;
  public address!: string;
  public slug!: string;
  public phone!: string;
  public email?: string;
  public description?: string;
  public deletedAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export function initStoreModel(sequelize: Sequelize): typeof Store {
  Store.init(
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
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      logo: {
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
      tableName: "stores",
      modelName: "Store",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  return Store;
}
