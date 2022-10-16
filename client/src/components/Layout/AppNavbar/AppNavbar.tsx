import { Navbar } from "@mantine/core";

import { MainLinks } from "./MainLinks";
import { User } from "./User";

interface IProps {
  opened: boolean;
}

export const AppNavbar = (props: IProps) => {
  return (
    <Navbar
      width={{ sm: 300, md: 300, lg: 300 }}
      hiddenBreakpoint="sm"
      p="md"
      hidden={!props.opened}
    >
      <Navbar.Section grow mt="xs">
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  );
};
