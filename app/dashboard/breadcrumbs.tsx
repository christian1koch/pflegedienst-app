import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  className?: string;
  items: {
    title: string;
    url: string;
  }[];
  currentPage: string;
}

export default function Breadcrumbs({
  items,
  currentPage,
  className,
}: BreadcrumbsProps) {
  return (
    <Breadcrumb className={className}>
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
