import {
  Burger,
  Group,
  Header,
  ActionIcon,
  MediaQuery,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";

import { Logo } from "./Logo";

interface IProps {
  opened: boolean;
  onToggle: () => void;
}

export const AppHeader = (props: IProps) => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Header height={60}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={props.opened}
            onClick={props.onToggle}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Logo colorScheme={colorScheme} />
        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
          {colorScheme === "dark" ? <IconSun size={16} /> : <IconMoonStars size={16} />}
        </ActionIcon>
      </Group>
    </Header>
  );
};
