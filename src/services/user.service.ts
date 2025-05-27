/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { User, UserCreationAttributes } from "../models/user.model"; // adjust path as needed
import { Op } from "sequelize";
import ApiError from "../utils/apiError";

type QueryResult = any; // Replace with actual QueryResult type if available
type UserType = User; // Use your User model

/**
 * Create a user
 */
const createUser = async (
  userBody: UserCreationAttributes
): Promise<UserType> => {
  const existing = await User.findOne({ where: { email: userBody.email } });
  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return User.create(userBody);
};

/**
 * Query for users
 */
const queryUsers = async (
  filter: Partial<UserType>,
  options: { skip?: number; take?: number; order?: any } = {}
): Promise<QueryResult> => {
  const { skip = 0, take = 10, order = [["createdAt", "DESC"]] } = options;
  const { rows: results, count: total } = await User.findAndCountAll({
    where: filter,
    offset: skip,
    limit: take,
    order,
  });
  return { results, total };
};

/**
 * Get user by id
 */
const getUserById = async (id: number | string): Promise<UserType | null> => {
  return User.findByPk(id);
};

/**
 * Get user by email
 */
const getUserByEmail = async (email: string): Promise<UserType | null> => {
  return User.findOne({ where: { email } });
};

/**
 * Update user by id
 */
const updateUserById = async (
  userId: number | string,
  updateBody: Partial<UserType>
): Promise<UserType> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email) {
    const emailTaken = await User.findOne({
      where: {
        email: updateBody.email,
        id: { [Op.ne]: userId },
      },
    });
    if (emailTaken) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
  }
  await user.update(updateBody);
  return user;
};

/**
 * Delete user by id
 */
const deleteUserById = async (userId: number | string): Promise<UserType> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.destroy();
  return user;
};

export {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
