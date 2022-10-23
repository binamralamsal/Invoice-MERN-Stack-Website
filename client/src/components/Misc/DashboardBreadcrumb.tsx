import { Anchor, Breadcrumbs } from "@mantine/core";
import { Link } from "react-router-dom";

type BreadcrumbItem = {
  title: string;
  to: string;
};

interface IProps {
  items: BreadcrumbItem[];
}

export const DashboardBreadcrumb = (props: IProps) => {
  const items = props.items.map((item, index) => (
    <Anchor component={Link} to={item.to} key={index}>
      {item.title}
    </Anchor>
  ));

  return <Breadcrumbs>{items}</Breadcrumbs>;
};
