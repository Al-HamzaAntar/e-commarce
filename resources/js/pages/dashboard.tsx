import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DollarSign, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const stats = [
    { title: 'Total Revenue', value: '$12,450', change: '+12.5%', icon: DollarSign, trend: 'up' as const },
    { title: 'Orders', value: '356', change: '+8.2%', icon: ShoppingCart, trend: 'up' as const },
    { title: 'Products', value: '48', change: '+3', icon: Package, trend: 'up' as const },
    { title: 'Customers', value: '1,205', change: '+18.7%', icon: Users, trend: 'up' as const },
];

const recentOrders = [
    { id: '#ORD-2401', customer: 'Sarah Johnson', amount: '$125.00', status: 'Delivered', date: 'Today' },
    { id: '#ORD-2400', customer: 'Mike Chen', amount: '$89.50', status: 'Shipped', date: 'Yesterday' },
    { id: '#ORD-2399', customer: 'Emily Davis', amount: '$245.00', status: 'Processing', date: '2 days ago' },
    { id: '#ORD-2398', customer: 'James Wilson', amount: '$67.25', status: 'Delivered', date: '3 days ago' },
    { id: '#ORD-2397', customer: 'Lisa Brown', amount: '$189.99', status: 'Shipped', date: '3 days ago' },
];

const statusColors: Record<string, string> = {
    Delivered: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    Shipped: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    Processing: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
};

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 sm:p-6">
                {/* Welcome header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Here is what is happening with your store today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.title}
                            className="border-border/60 bg-card hover:border-border rounded-2xl border p-5 transition-all hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground text-sm">{stat.title}</span>
                                <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-xl">
                                    <stat.icon className="text-primary h-4.5 w-4.5" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                                <span className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                    <TrendingUp className="mr-0.5 h-3 w-3" />
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Orders */}
                <div className="border-border/60 bg-card rounded-2xl border">
                    <div className="border-border/50 flex items-center justify-between border-b p-5">
                        <div>
                            <h2 className="font-semibold">Recent Orders</h2>
                            <p className="text-muted-foreground mt-0.5 text-sm">Your latest customer orders</p>
                        </div>
                        <button className="text-primary hover:bg-primary/10 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors">
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-border/50 text-muted-foreground border-b text-left text-xs font-medium">
                                    <th className="px-5 py-3">Order</th>
                                    <th className="px-5 py-3">Customer</th>
                                    <th className="px-5 py-3">Amount</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-border/30 hover:bg-accent/50 border-b text-sm transition-colors last:border-0"
                                    >
                                        <td className="px-5 py-3.5 font-medium">{order.id}</td>
                                        <td className="text-muted-foreground px-5 py-3.5">{order.customer}</td>
                                        <td className="px-5 py-3.5 font-medium">{order.amount}</td>
                                        <td className="px-5 py-3.5">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status] || ''}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="text-muted-foreground px-5 py-3.5 text-right">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
