import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DollarSign, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: '/dashboard',
    },
];

const stats = [
    { title: 'إجمالي الإيرادات', value: '$12,450', change: '+12.5%', icon: DollarSign, trend: 'up' as const },
    { title: 'الطلبات', value: '356', change: '+8.2%', icon: ShoppingCart, trend: 'up' as const },
    { title: 'المنتجات', value: '48', change: '+3', icon: Package, trend: 'up' as const },
    { title: 'العملاء', value: '1,205', change: '+18.7%', icon: Users, trend: 'up' as const },
];

const recentOrders = [
    { id: '#ORD-2401', customer: 'سارة جونسون', amount: '$125.00', status: 'تم التوصيل', date: 'اليوم' },
    { id: '#ORD-2400', customer: 'مايك تشن', amount: '$89.50', status: 'تم الشحن', date: 'أمس' },
    { id: '#ORD-2399', customer: 'إيميلي ديفيس', amount: '$245.00', status: 'قيد المعالجة', date: 'منذ يومين' },
    { id: '#ORD-2398', customer: 'جيمس ويلسون', amount: '$67.25', status: 'تم التوصيل', date: 'منذ 3 أيام' },
    { id: '#ORD-2397', customer: 'ليزا براون', amount: '$189.99', status: 'تم الشحن', date: 'منذ 3 أيام' },
];

const statusColors: Record<string, string> = {
    'تم التوصيل': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    'تم الشحن': 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    'قيد المعالجة': 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
};

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="لوحة التحكم" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 sm:p-6">
                {/* ترحيب */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">مرحباً بعودتك</h1>
                    <p className="text-muted-foreground mt-1 text-sm">إليك ما يحدث في متجرك اليوم.</p>
                </div>

                {/* شبكة الإحصائيات */}
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
                                    <TrendingUp className="ml-0.5 h-3 w-3" />
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* الطلبات الأخيرة */}
                <div className="border-border/60 bg-card rounded-2xl border">
                    <div className="border-border/50 flex items-center justify-between border-b p-5">
                        <div>
                            <h2 className="font-semibold">الطلبات الأخيرة</h2>
                            <p className="text-muted-foreground mt-0.5 text-sm">أحدث طلبات العملاء</p>
                        </div>
                        <button className="text-primary hover:bg-primary/10 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors">
                            عرض الكل
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-border/50 text-muted-foreground border-b text-right text-xs font-medium">
                                    <th className="px-5 py-3">الطلب</th>
                                    <th className="px-5 py-3">العميل</th>
                                    <th className="px-5 py-3">المبلغ</th>
                                    <th className="px-5 py-3">الحالة</th>
                                    <th className="px-5 py-3 text-left">التاريخ</th>
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
                                        <td className="text-muted-foreground px-5 py-3.5 text-left">{order.date}</td>
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
