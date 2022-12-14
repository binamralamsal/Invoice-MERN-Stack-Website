import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

import { useStyles } from "./style";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
}

export function MainLink({ icon, color, label, to }: MainLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <UnstyledButton
      component={Link}
      to={to}
      className={cx(classes.linkButton, { [classes.linkActive]: to === window.location.pathname })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
