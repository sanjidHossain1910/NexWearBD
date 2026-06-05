import { requireAdmin } from "@/lib/guards";

export default async function AdminBannersPage() {
  await requireAdmin();
  return <section className="container py-10"><h1 className="text-3xl font-bold tracking-normal">Manage Homepage Banners</h1><p className="mt-3 text-muted-foreground">Upload Cloudinary banners and choose hero, category, or promo placement.</p></section>;
}
