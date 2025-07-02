"use client";
import {
  SidebarContent,
  SidebarGroup,
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Car, Users, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Meine Patienten",
    url: "/dashboard/patients",
    icon: Users,
  },
  {
    title: "Wagen Buchen",
    url: "/dashboard/wagen",
    icon: Car,
  },
  {
    title: "Verfügbarkeiten",
    url: "/dashboard/verfuerbarkeiten",
    icon: Calendar,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pflegekraft </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={isActive ? "bg-muted rounded-md font-bold" : ""}
                  >
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={isActive ? "text-primary" : undefined}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
