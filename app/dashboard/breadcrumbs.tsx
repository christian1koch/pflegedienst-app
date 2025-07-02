import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  items: {
    title: string;
    url: string;
  }[];
  currentPage: string;
}

export default function Breadcrumbs({ items, currentPage }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item) => (
          <BreadcrumbItem key={item.title}>
            <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
        <BreadcrumbPage>{currentPage}</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
