// const authRoute = require('./auth.route');
// const userRoute = require('./user.route');
// const docsRoute = require('./docs.route');
// const config = require('../../config/config');
import express from "express";
import { config } from "../../config/config";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import categoryRoute from "./category.route";
import sizeRoute from "./size.route";
import colorRoute from "./color.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/categories",
    route: categoryRoute,
  },
  {
    path: "/sizes",
    route: sizeRoute,
  },
  {
    path: "/colors",
    route: colorRoute,
  },
];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === "development") {
  //   devRoutes.forEach((route) => {
  //     router.use(route.path, route.route);
  //   });
}

export default router;
