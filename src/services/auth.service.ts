/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
// import tokenService from './token.service';
import * as userService from "./user.service";
// import Token from '../models/token.model';
// import { tokenTypes } from '../config/tokens';
import ApiError from "../utils/apiError";

// Import User type if available, otherwise use 'any'
type UserType = any; // Replace with actual User type if available

/**
 * Login with username and password
 */
const loginUserWithEmailAndPassword = async (
  email: string
  //   password: string
): Promise<UserType> => {
  const user = await userService.getUserByEmail(email);
  //   if (!user || !(await user.isPasswordMatch(password))) {
  //     throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  //   }
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

/**
 * Logout
 */
// const logout = async (refreshToken: string): Promise<void> => {
//   const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
//   if (!refreshTokenDoc) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
//   }
//   await refreshTokenDoc.remove();
// };

/**
 * Refresh auth tokens
 */
// const refreshAuth = async (refreshToken: string): Promise<object> => {
//   try {
//     const refreshTokenDoc = await tokenService.verifyToken(
//       refreshToken,
//       tokenTypes.REFRESH
//     );
//     const user = await userService.getUserById(refreshTokenDoc.user);
//     if (!user) {
//       throw new Error();
//     }
//     await refreshTokenDoc.remove();
//     return tokenService.generateAuthTokens(user);
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
//   }
// };

/**
 * Reset password
 */
// const resetPassword = async (
//   resetPasswordToken: string,
//   newPassword: string
// ): Promise<void> => {
//   try {
//     const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
//     const user = await userService.getUserById(resetPasswordTokenDoc.user);
//     if (!user) {
//       throw new Error();
//     }
//     await userService.updateUserById(user.id, { password: newPassword });
//     await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
//   }
// };

/**
 * Verify email
 */
// const verifyEmail = async (verifyEmailToken: string): Promise<void> => {
//   try {
//     const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
//     const user = await userService.getUserById(verifyEmailTokenDoc.user);
//     if (!user) {
//       throw new Error();
//     }
//     await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
//     await userService.updateUserById(user.id, { isEmailVerified: true });
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
//   }
// };

export default { loginUserWithEmailAndPassword };
