import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/mealdb"], // Add any public routes here
});

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|.*\\..*).*)", "/api/(.*)"],
};
