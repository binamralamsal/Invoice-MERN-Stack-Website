import { Flex, Stack, TextInput, Button, Title, Table, Radio } from "@mantine/core";
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
        <Flex gap="xl">
          <TextInput
            placeholder="Product name"
            label="Product name"
            size="md"
            {...props.register("name")}
            error={props.errors.name?.message}
            style={{ flex: 2 }}
          />
          <TextInput
            type="number"
            placeholder="Cost price"
            label="Cost price"
            size="md"
            {...props.register("costPrice", { valueAsNumber: true })}
            error={props.errors.costPrice?.message}
            style={{ flex: 1 }}
          />
          <TextInput
            placeholder="Selling price"
            label="Selling price"
            type="number"
            size="md"
            error={props.errors.sellingPrice?.message}
            {...props.register(`sellingPrice`, { valueAsNumber: true })}
            style={{ flex: 1 }}
          />
        </Flex>

        <Flex mt="xl">
          <Radio.Group label="Number per boxe q s" error={props.errors.numberOfSubBoxes?.message}>
            <Radio value="6" label="6" {...props.register("numberOfSubBoxes")} />
            <Radio value="12" label="12" {...props.register("numberOfSubBoxes")} />
          </Radio.Group>
        </Flex>

        <Flex justify="space-between" mt="xl">
          <Title order={3}>Sizes</Title>
          <Button variant="outline" onClick={props.onAddSize} type="button">
            Add size
          </Button>
        </Flex>

        <Table verticalSpacing="sm">
          <thead>
            <tr>
              <th>S.n.</th>
              <th>Size name</th>
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
