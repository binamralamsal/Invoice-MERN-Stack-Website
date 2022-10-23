import { IconShoppingCart, IconFileInvoice } from "@tabler/icons";
import React from "react";

import { MainLink } from "./MainLink";

export const data = [
  { icon: <IconShoppingCart size={16} />, color: "blue", label: "Products", to: "/" },
  { icon: <IconFileInvoice size={16} />, color: "teal", label: "Invoices", to: "/invoices" },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} to={link.to} />);
  return <>{links}</>;
}
