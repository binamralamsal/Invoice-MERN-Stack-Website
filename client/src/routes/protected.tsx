import { DashboardLayout } from "@/components/Layout/";
import { ProtectedRoute } from "@/components/Misc/";
import { invoicesRoutes } from "@/features/invoices";
import { productsRoutes } from "@/features/products";

const protectedRoutes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [{ children: [{ element: <DashboardLayout />, children: productsRoutes }] }],
  },
  {
    path: "/invoices",
    element: <ProtectedRoute />,
    children: [{ children: [{ element: <DashboardLayout />, children: invoicesRoutes }] }],
  },
];

export default protectedRoutes;
