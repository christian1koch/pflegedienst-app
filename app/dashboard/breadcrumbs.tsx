import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

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
    <Breadcrumb className={cn("my-2 border-b border-gray-200 py-2", className)}>
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
