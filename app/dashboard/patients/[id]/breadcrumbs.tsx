import { FC } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  items: { title: string; url: string }[];
  currentPage: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, currentPage }) => {
  return (
    <Breadcrumb className="mt-4 mb-6">
      <ol className="flex items-center space-x-2">
        {items.map((item) => (
          <li key={item.url} className="flex items-center">
            <a
              href={item.url}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {item.title}
            </a>
            <span className="text-muted-foreground mx-2">/</span>
          </li>
        ))}
        <li className="text-foreground font-semibold">{currentPage}</li>
      </ol>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
