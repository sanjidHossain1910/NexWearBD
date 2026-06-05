
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ReduxProvider } from "@/components/common/redux-provider";
import { UserStateHydrator } from "@/components/common/user-state-hydrator";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
// import { Analytics } from "@vercel/analytics/next"




export const metadata: Metadata = {
  title: { default: "Nexwear | Modern Men's Fashion", template: "%s | Nexwear" },
  description: "Premium men's fashion in Bangladesh: oversized tees, polos, casual shirts, panjabi, hoodies, and jackets.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <UserStateHydrator user={session?.user ? { id: session.user.id, name: session.user.name, email: session.user.email, image: session.user.image, role: session.user.role } : null} />
            <Navbar user={session?.user} />
            <div className="absolute">

            </div>
            <main className="min-h-screen">{children}</main>
            <Toaster position="top-center" />
            {/* <Analytics /> */}
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}