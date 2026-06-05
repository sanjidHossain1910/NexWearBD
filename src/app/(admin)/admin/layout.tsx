
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ReduxProvider } from "@/components/common/redux-provider";
import { UserStateHydrator } from "@/components/common/user-state-hydrator";
import { ThemeProvider } from "@/components/theme-provider";
import "../../globals.css"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/Sidebar";
import { Toaster } from "@/components/ui/sonner";



export const metadata: Metadata = {
  title: { default: "Nexwear | Modern Men's Fashion", template: "%s | Nexwear" },
  description: "Premium men's fashion in Bangladesh: oversized tees, polos, casual shirts, panjabi, hoodies, and jackets.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
};


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <SidebarProvider>
            <AppSidebar />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <UserStateHydrator user={session?.user ? { id: session.user.id, name: session.user.name, email: session.user.email, image: session.user.image, role: session.user.role } : null} />
              <div className="flex w-full">
                <main className="flex-1 dark:bg-gray-950 dark:text-white w-full">
                  <SidebarTrigger />
                  {children}
                  <Toaster position="top-center"/>
                </main>
              </div>
            </ThemeProvider>
          </SidebarProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
