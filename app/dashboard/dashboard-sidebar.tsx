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
import { Calendar, Car, Users } from "lucide-react";

const items = [
  {
    title: "Meine Patienten",
    url: "/dashboard/patients",
    icon: Users,
  },
  {
    title: "Deine Verfürbarkeiten",
    url: "/dashboard/availability",
    icon: Calendar,
  },
  {
    title: "Wagen Buchen",
    url: "/dashboard/book-vehicle",
    icon: Car,
  },
];

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pflegekraft </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
