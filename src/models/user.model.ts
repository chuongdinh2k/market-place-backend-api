import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes for User
export interface UserAttributes {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  password: string;
  isEmailVerified: boolean;
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
  public avatarUrl?: string;
  public deletedAt?: Date | null;
  public isEmailVerified!: boolean;
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
        field: "avatar_url",
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
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "deleted_at",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
}
