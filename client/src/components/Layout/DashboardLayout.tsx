import { AppShell } from "@mantine/core";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { AppHeader } from "./AppHeader";
import { AppNavbar } from "./AppNavbar";
import { useStyles } from "./style";

export function DashboardLayout() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  const toggleNavbar = () => setOpened(!opened);

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={<AppNavbar opened={opened} />}
      header={<AppHeader opened={opened} onToggle={toggleNavbar} />}
      className={classes.main}
    >
      <Outlet />
    </AppShell>
  );
}
