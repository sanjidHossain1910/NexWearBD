import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const icons = { products: Package, orders: ShoppingCart, revenue: DollarSign, customers: Users };

export function DashboardCards({ stats }: { stats: { totalProducts: number; totalOrders: number; totalRevenue: number; totalCustomers: number } }) {
  const cards = [
    { label: "Total Products", value: stats.totalProducts, icon: icons.products },
    { label: "Total Orders", value: stats.totalOrders, icon: icons.orders },
    { label: "Total Revenue", value: formatCurrency(stats.totalRevenue), icon: icons.revenue },
    { label: "Total Customers", value: stats.totalCustomers, icon: icons.customers }
  ];
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map((card) =>
        <Card key={card.label}>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{card.label}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{card.value}</p>
          </CardContent>
        </Card>)}
    </div>
  )
}
