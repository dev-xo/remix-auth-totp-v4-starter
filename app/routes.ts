import {
  type RouteConfig,
  layout,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./routes/auth.tsx", [
    route("auth/login", "./routes/auth.login.tsx"),
    route("auth/logout", "./routes/auth.logout.tsx"),
    route("auth/verify", "./routes/auth.verify.tsx"),
  ]),
  route("dashboard", "./routes/dashboard.tsx"),
] satisfies RouteConfig;
