import { Flex, Stack, TextInput, Button, Title, Table } from "@mantine/core";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

import { ProductCredentialsDTO } from "../validators";

import { NewProductSizes } from "./NewProductSizes";

interface IProps {
  onSubmit: () => void;
  register: UseFormRegister<ProductCredentialsDTO>;
  errors: FieldErrors<ProductCredentialsDTO>;
  remove: UseFieldArrayRemove;
  onAddSize: () => void;
  isSubmitting: boolean;
  fields: FieldArrayWithId<ProductCredentialsDTO>[];
}

export const ProductForm = (props: IProps) => {
  return (
    <Stack mt="xl">
      <form onSubmit={props.onSubmit}>
        <Flex>
          <TextInput
            placeholder="Product name"
            label="Product name"
            size="md"
            {...props.register("name")}
            error={props.errors.name?.message}
            style={{ flex: 1 }}
          />
          <div style={{ flex: 1 }} />
        </Flex>

        <Flex justify="space-between" mt="xl">
          <Title order={3}>Sizes</Title>
          <Button variant="outline" onClick={props.onAddSize} type="button">
            Add size
          </Button>
        </Flex>

        <Table verticalSpacing="lg">
          <thead>
            <tr>
              <th>S.n.</th>
              <th>Size name</th>
              <th>Cost price</th>
              <th>Selling price</th>
              <th>Remaining stock</th>
            </tr>
          </thead>
          <tbody>
            {props.fields.map((field, index) => (
              <NewProductSizes
                key={field.id}
                index={index}
                remove={props.remove}
                register={props.register}
                errors={props.errors}
              />
            ))}
          </tbody>
        </Table>

        {props.errors.sizes?.message}

        <Button mt="xl" type="submit" loading={props.isSubmitting}>
          Submit
        </Button>
      </form>
    </Stack>
  );
};
