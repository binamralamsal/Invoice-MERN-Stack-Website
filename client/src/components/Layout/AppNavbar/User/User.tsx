import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme, Menu } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconChevronRight,
  IconChevronLeft,
  IconLogout,
  IconSettings,
  IconCheck,
} from "@tabler/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import storage from "@/utils/storage";

import { useStyles } from "./style";

export function User() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const onLogout = () => {
    storage.clearToken();
    navigate("/login");
    showNotification({
      icon: <IconCheck size={16} />,
      color: "teal",
      title: "Logged out successfully",
      message: "You can login again if you wish to!",
    });
  };

  return (
    <Box className={classes.userBox}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton className={classes.userButton}>
            <Group>
              <Avatar
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                radius="xl"
              />
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  Amy Horsefighter
                </Text>
                <Text color="dimmed" size="xs">
                  ahorsefighter@gmail.com
                </Text>
              </Box>

              {theme.dir === "ltr" ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item component={Link} to="/settings" icon={<IconSettings size={14} />}>
            Settings
          </Menu.Item>
          <Menu.Item color="red" onClick={onLogout} icon={<IconLogout size={14} />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
