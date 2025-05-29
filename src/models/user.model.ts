import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes for User
export interface UserAttributes {
  id: number;
  email: string;
  firstName: string;
  idGenerated: string;
  lastName: string;
  avatarUrl?: string;
  password: string;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public idGenerated!: string;
  public avatarUrl?: string;
  public deletedAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export function initUserModel(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      idGenerated: {
        type: DataTypes.STRING(36),
        allowNull: false,
        unique: true,
        field: "id_gen",
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "last_name",
      },
      avatarUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "avatar",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
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
      tableName: "users",
      modelName: "User",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  return User;
}
