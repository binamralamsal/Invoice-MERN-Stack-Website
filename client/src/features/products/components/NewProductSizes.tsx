import { TextInput, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { UseFieldArrayRemove, UseFormRegister, FieldErrors } from "react-hook-form";

import { ProductCredentialsDTO } from "../validators";

interface IProps {
  index: number;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<ProductCredentialsDTO>;
  errors: FieldErrors<ProductCredentialsDTO>;
}

export const NewProductSizes = (props: IProps) => {
  return (
    <tr>
      <td>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <ActionIcon
            color="red"
            size="lg"
            radius="xl"
            variant="filled"
            onClick={() => props.remove(props.index)}
          >
            <IconTrash size={20} />
          </ActionIcon>
          {props.index + 1}.
        </div>
      </td>
      <td>
        <TextInput
          placeholder="Size name"
          {...props.register(`sizes.${props.index}.name`)}
          error={props.errors.sizes?.[props.index]?.name?.message}
        />
      </td>
      <td>
        <TextInput
          type="number"
          placeholder="Cost price"
          {...props.register(`sizes.${props.index}.costPrice`, { valueAsNumber: true })}
          error={props.errors.sizes?.[props.index]?.costPrice?.message}
        />
      </td>
      <td>
        <TextInput
          placeholder="Selling price"
          type="number"
          error={props.errors.sizes?.[props.index]?.sellingPrice?.message}
          {...props.register(`sizes.${props.index}.sellingPrice`, { valueAsNumber: true })}
        />
      </td>
      <td>
        <TextInput
          placeholder="Remaining stock"
          type="number"
          error={props.errors.sizes?.[props.index]?.remainingStock?.message}
          {...props.register(`sizes.${props.index}.remainingStock`, { valueAsNumber: true })}
        />
      </td>
    </tr>
  );
};
