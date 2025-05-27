import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(3306),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    // DATABASE_URL: Joi.string().required().description("MYSQL database URL"),
    // JWT_SECRET: Joi.string().required().description("JWT secret key"),
    // JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
    //   .default(30)
    //   .description("minutes after which access tokens expire"),
    // JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
    //   .default(30)
    //   .description("days after which refresh tokens expire"),
    // JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
    //   .default(10)
    //   .description("minutes after which reset password token expires"),
    // JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
    //   .default(10)
    //   .description("minutes after which verify email token expires"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  databaseName: envVars.DATABASE_NAME,
  databaseHost: envVars.DATABASE_HOST,
  databasePort: envVars.DATABASE_PORT,
  databaseUsername: envVars.DATABASE_USERNAME,
  databasePassword: envVars.DATABASE_PASSWORD,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
};
