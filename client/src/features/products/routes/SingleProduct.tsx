import { Container, Stack, Title, Flex, Table, Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { DashboardBreadcrumb } from "@/components/Misc";

import { getSingleProduct } from "../api/getSingleProduct";

export const SingleProduct = () => {
  const { id } = useParams();

  const { data } = useQuery([`single-product-${id}`], () => getSingleProduct(id as string));

  if (!data) return null;
  const breadcrumbItems = [
    { to: "/", title: "Products" },
    { to: `/products/${id}`, title: `${id}` },
  ];

  return (
    <Container size="xl">
      <DashboardBreadcrumb items={breadcrumbItems} />
      <Flex mt="sm" justify="space-between">
        <Title order={2} size="h1">
          {data.name} - ({data._id})
        </Title>
        <Button component={Link} to={`/products/${id}/edit`} variant="outline">
          Edit
        </Button>
      </Flex>

      <Stack mt="xl">
        <Flex gap="50px">
          <div>
            <Flex direction="row" align="center" gap={5}>
              <strong>Name: </strong>
              <p style={{ margin: 0 }}>{data.name}</p>
            </Flex>
            <Flex direction="row" align="center" gap={5}>
              <strong>Cost Price: </strong>
              <p style={{ margin: 0 }}>{data.costPrice}</p>
            </Flex>
            <Flex direction="row" align="center" gap={5}>
              <strong>Selling Price: </strong>
              <p style={{ margin: 0 }}>{data.sellingPrice}</p>
            </Flex>
          </div>
          <div>
            <Flex direction="row" align="center" gap={5}>
              <strong>Total Remaining Stock: </strong>
              <p style={{ margin: 0 }}>{data.totalRemainingStock}</p>
            </Flex>
            <Flex direction="row" align="center" gap={5}>
              <strong>Created At: </strong>
              <p style={{ margin: 0 }}>{new Date(data.createdAt).toLocaleString()}</p>
            </Flex>
            <Flex direction="row" align="center" gap={5}>
              <strong>Last Updated At: </strong>
              <p style={{ margin: 0 }}>{new Date(data.updatedAt).toLocaleString()}</p>
            </Flex>
          </div>
        </Flex>

        <Flex justify="space-between" mt="xl">
          <Title order={3}>Sizes</Title>
        </Flex>

        <Table verticalSpacing="lg">
          <thead>
            <tr>
              <th>S.n.</th>
              <th>Size name</th>
              {/*<th>Cost price</th>*/}
              {/*<th>Selling price</th>*/}
              <th>Remaining stock</th>
            </tr>
          </thead>
          <tbody>
            {data.sizes.map((size, index) => (
              <tr key={size._id}>
                <td>{index + 1}</td>
                <td>{size.name}</td>
                {/*<td>{size.costPrice}</td>*/}
                {/*<td>{size.sellingPrice}</td>*/}
                <td>{size.remainingStock}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    </Container>
  );
};
