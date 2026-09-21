import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // Matches "/" as well as "/about", "/experience", "/projects", "/systems", "/contact"
    route(":page?", "routes/index.tsx"),
] satisfies RouteConfig;