import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route(":path*", "routes/Home.tsx"),
] satisfies RouteConfig;