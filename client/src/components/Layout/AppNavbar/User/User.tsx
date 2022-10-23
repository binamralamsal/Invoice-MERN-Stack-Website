import { UnstyledButton, Group, Avatar, Text, Box, Menu } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconChevronRight, IconLogout, IconSettings, IconCheck } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUser } from "@/features/auth";
import storage from "@/utils/storage";

import { useStyles } from "./style";
import { UserSkeleton } from "./UserSkeleton";

export function User() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(["current-user"], getUser);

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

  const renderUserDetails = () => {
    if (isLoading) return <UserSkeleton />;
    return (
      <>
        <Avatar src={null} color="red" radius="xl" />
        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {data?.name}
          </Text>
          <Text color="dimmed" size="xs">
            {data?.email}
          </Text>
        </Box>
      </>
    );
  };

  return (
    <Box className={classes.userBox}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton className={classes.userButton}>
            <Group>
              {renderUserDetails()}
              <IconChevronRight size={18} />
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
