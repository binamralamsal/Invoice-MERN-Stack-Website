import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { DashboardBreadcrumb } from "@/components/Misc";

import { editProduct } from "../api/editProduct";
import { getSingleProduct } from "../api/getSingleProduct";
import { ProductForm } from "../components/ProductForm";
import { ProductCredentialsDTO, productValidator } from "../validators";

const breadcrumbItems = [
  { to: "/", title: "Products" },
  { to: "/products/new", title: "New Product" },
];

export const EditProduct = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<ProductCredentialsDTO>({
    resolver: zodResolver(productValidator),
    mode: "all",
  });
  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  useQuery([`single-product-${id}`], () => getSingleProduct(id as string), {
    onSuccess: (d) => {
      if (isDirty) return;
      reset(d);
    },
  });

  const handleFormSubmit = async (data: ProductCredentialsDTO) => {
    const response = await editProduct(id as string, data);

    if (!response) return;
    navigate(`/products/${id}`);
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
        Edit Products
      </Title>

      <ProductForm
        onSubmit={handleSubmit(handleFormSubmit)}
        register={register}
        errors={errors}
        remove={remove}
        onAddSize={() => append({ remainingStock: NaN, name: "" })}
        isSubmitting={isSubmitting}
        fields={fields}
      />
    </Container>
  );
};
