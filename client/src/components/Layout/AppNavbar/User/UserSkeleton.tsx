import { Skeleton, Box } from "@mantine/core";

export const UserSkeleton = () => {
  return (
    <>
      <Skeleton height={36} circle />
      <Box sx={{ flex: 1 }}>
        <Skeleton height={15} width="80%" />
        <Skeleton height={15} mt={1} />
      </Box>
    </>
  );
};
