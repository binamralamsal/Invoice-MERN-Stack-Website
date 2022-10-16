import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  linkButton: {
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));
