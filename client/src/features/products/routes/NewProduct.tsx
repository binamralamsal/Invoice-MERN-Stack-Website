import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { DashboardBreadcrumb } from "@/components/Misc";

import { addProduct } from "../api/addProduct";
import { ProductForm } from "../components/ProductForm";
import { ProductCredentialsDTO, productValidator } from "../validators";

const breadcrumbItems = [
  { to: "/", title: "Products" },
  { to: "/products/new", title: "New Product" },
];

export const NewProduct = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductCredentialsDTO>({
    resolver: zodResolver(productValidator),
    mode: "all",
    defaultValues: {
      sizes: [
        {
          name: "",
          costPrice: NaN,
          remainingStock: NaN,
          sellingPrice: NaN,
        },
      ],
    },
  });
  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  const handleFormSubmit = async (data: ProductCredentialsDTO) => {
    const response = await addProduct(data);

    if (!response) return;
    navigate(`/products/${response._id}`);
    showNotification({
      icon: <IconCheck size={16} />,
      color: "teal",
      title: "Created product successfully",
      message: "Something new",
    });
  };

  return (
    <Container size="xl">
      <DashboardBreadcrumb items={breadcrumbItems} />
      <Title order={2} mt="sm" size="h1">
        New Products
      </Title>

      <ProductForm
        onSubmit={handleSubmit(handleFormSubmit)}
        register={register}
        errors={errors}
        remove={remove}
        onAddSize={() =>
          append({ remainingStock: NaN, name: "", sellingPrice: NaN, costPrice: NaN })
        }
        isSubmitting={isSubmitting}
        fields={fields}
      />
    </Container>
  );
};
