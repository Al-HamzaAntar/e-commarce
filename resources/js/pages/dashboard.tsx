import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { DollarSign, Package, ShoppingCart, Star, TrendingUp, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: '/dashboard',
    },
];

const iconMap = {
    revenue: DollarSign,
    products: Package,
    customers: Users,
    lowStock: ShoppingCart,
} as const;

const statusColors: Record<string, string> = {
    lowStock: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    inStock: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
};

type DashboardStat = {
    title: string;
    value: string;
    change: string;
    type: keyof typeof iconMap;
};

type ProductRow = {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    updated_at: string;
};

type DashboardProps = {
    stats: DashboardStat[];
    recentProducts: ProductRow[];
};

export default function Dashboard({ stats, recentProducts }: DashboardProps) {
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
                    {stats.map((stat) => {
                        const IconComponent = iconMap[stat.type];

                        return (
                            <div
                                key={stat.title}
                                className="border-border/60 bg-card hover:border-border rounded-2xl border p-5 transition-all hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground text-sm">{stat.title}</span>
                                    <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-xl">
                                        <IconComponent className="text-primary h-4.5 w-4.5" />
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
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="border-border/60 bg-card rounded-2xl border p-6">
                    <h2 className="mb-4 font-semibold">إجراءات سريعة</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Link
                            href="/products/create"
                            className="border-border/60 bg-accent/50 hover:bg-accent flex flex-col items-center gap-3 rounded-xl border p-4 transition-colors"
                        >
                            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                                <Package className="text-primary h-6 w-6" />
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-medium">إضافة منتج</div>
                                <div className="text-muted-foreground text-xs">أضف منتج جديد للمتجر</div>
                            </div>
                        </Link>

                        <Link
                            href="/hero-items"
                            className="border-border/60 bg-accent/50 hover:bg-accent flex flex-col items-center gap-3 rounded-xl border p-4 transition-colors"
                        >
                            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                                <Star className="text-primary h-6 w-6" />
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-medium">عناصر البطل</div>
                                <div className="text-muted-foreground text-xs">إدارة القسم البطولي</div>
                            </div>
                        </Link>

                        <Link
                            href="/products"
                            className="border-border/60 bg-accent/50 hover:bg-accent flex flex-col items-center gap-3 rounded-xl border p-4 transition-colors"
                        >
                            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                                <ShoppingCart className="text-primary h-6 w-6" />
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-medium">إدارة المنتجات</div>
                                <div className="text-muted-foreground text-xs">عرض وتعديل المنتجات</div>
                            </div>
                        </Link>

                        <Link
                            href="/settings/profile"
                            className="border-border/60 bg-accent/50 hover:bg-accent flex flex-col items-center gap-3 rounded-xl border p-4 transition-colors"
                        >
                            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                                <Users className="text-primary h-6 w-6" />
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-medium">الملف الشخصي</div>
                                <div className="text-muted-foreground text-xs">إدارة حسابك</div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* أحدث المنتجات */}
                <div className="border-border/60 bg-card rounded-2xl border">
                    <div className="border-border/50 flex items-center justify-between border-b p-5">
                        <div>
                            <h2 className="font-semibold">أحدث المنتجات</h2>
                            <p className="text-muted-foreground mt-0.5 text-sm">أحدث المنتجات من قاعدة البيانات</p>
                        </div>
                        <button className="text-primary hover:bg-primary/10 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors">
                            عرض الكل
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-border/50 text-muted-foreground border-b text-right text-xs font-medium">
                                    <th className="px-5 py-3">المنتج</th>
                                    <th className="px-5 py-3">السعر</th>
                                    <th className="px-5 py-3">المخزون</th>
                                    <th className="px-5 py-3">الفئة</th>
                                    <th className="px-5 py-3 text-left">آخر تحديث</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentProducts.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="border-border/30 hover:bg-accent/50 border-b text-sm transition-colors last:border-0"
                                    >
                                        <td className="px-5 py-3.5 font-medium">{product.name}</td>
                                        <td className="text-muted-foreground px-5 py-3.5">${Number(product.price).toFixed(2)}</td>
                                        <td className="px-5 py-3.5">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${product.stock < 10 ? statusColors.lowStock : statusColors.inStock}`}
                                            >
                                                {product.stock} في المخزون
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">{product.category}</td>
                                        <td className="text-muted-foreground px-5 py-3.5 text-left">{product.updated_at}</td>
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
