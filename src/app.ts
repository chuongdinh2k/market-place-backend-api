import httpStatus from "http-status";
import express from "express";
import compression from "compression";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { config } from "./config/config";
import * as morgan from "./config/morgan";
import routes from "./routes/v1";
import { authLimiter } from "./middlewares/rateLimiter";
import ApiError from "./utils/apiError";
import { errorConverter, errorHandler } from "./middlewares/error";

const app = express();
if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
// app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(xss());
// app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// Swagger UI setup
app.use('/v1/docs', swaggerUi.serve);
app.get('/v1/docs', swaggerUi.setup(swaggerSpec, { explorer: true }));

// jwt authentication
// app.use(passport.initialize());
// passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
