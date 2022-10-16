import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { IconShoppingCart, IconFileInvoice } from "@tabler/icons";
import React from "react";

import { useStyles } from "./style";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

function MainLink({ icon, color, label }: MainLinkProps) {
  const { classes } = useStyles();
  return (
    <UnstyledButton className={classes.linkButton}>
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { icon: <IconShoppingCart size={16} />, color: "blue", label: "Products" },
  { icon: <IconFileInvoice size={16} />, color: "teal", label: "Invoices" },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
