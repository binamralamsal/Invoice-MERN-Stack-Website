import { authRoutes } from "@/features/auth";
import { NotFound } from "@/features/misc";

const publicRoutes = [
  { path: "/", children: authRoutes },
  { path: "*", element: <NotFound /> },
];

export default publicRoutes;
