import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { ChartLine, ClipboardList, LayoutDashboard, LogOut, PackageCheck, PackagePlus, PackageSearch } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu className="">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin">
                <Image src={"/logoblack.png"} className="dark:hidden" width={50} height={50} alt="logo" />
                <Image src={"/logowhite.png"} className="hidden dark:block" width={50} height={50} alt="logo" />
                <h2 className="text-2xl font-bold">Nexwear</h2>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin"><LayoutDashboard size={20}/> Dashbord</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/analytics"><ChartLine size={20}/>Analytics</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/add-products"><PackagePlus size={20} /> Add Products</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/products"><PackageCheck size={20} />Products</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/orders"><ClipboardList />Orders</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild variant={"default"}>
              <Link href="/"> <LogOut size={20} />Exit</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}