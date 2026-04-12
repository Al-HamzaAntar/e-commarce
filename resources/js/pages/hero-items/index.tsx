import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: '/dashboard',
    },
    {
        title: 'عناصر البطل',
        href: '/hero-items',
    },
];

interface HeroItem {
    id: number;
    title: string;
    description?: string;
    image?: string;
    link?: string;
    link_text?: string;
    badge_text?: string;
    badge_color: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface HeroItemsIndexProps {
    heroItems: HeroItem[];
}

export default function HeroItemsIndex({ heroItems }: HeroItemsIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
            router.delete(`/hero-items/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="عناصر البطل" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">عناصر البطل</h1>
                        <p className="text-muted-foreground mt-1 text-sm">إدارة عناصر القسم البطولي في الصفحة الرئيسية</p>
                    </div>
                    <Link
                        href="/hero-items/create"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        إضافة عنصر جديد
                    </Link>
                </div>

                {/* Hero Items Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {heroItems.map((item) => (
                        <div
                            key={item.id}
                            className="border-border/60 bg-card hover:border-border overflow-hidden rounded-2xl border transition-all hover:shadow-md"
                        >
                            {/* Image */}
                            <div className="bg-accent/50 relative aspect-video overflow-hidden">
                                <img
                                    src={
                                        item.image ||
                                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5IZXJvPC90ZXh0Pjwvc3ZnPg=='
                                    }
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                />
                                {item.badge_text && (
                                    <div
                                        className={`absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-semibold text-white ${
                                            item.badge_color === 'primary'
                                                ? 'bg-primary'
                                                : item.badge_color === 'secondary'
                                                  ? 'bg-secondary'
                                                  : item.badge_color === 'accent'
                                                    ? 'bg-accent'
                                                    : item.badge_color === 'destructive'
                                                      ? 'bg-red-500'
                                                      : item.badge_color === 'success'
                                                        ? 'bg-green-500'
                                                        : 'bg-primary'
                                        }`}
                                    >
                                        {item.badge_text}
                                    </div>
                                )}
                                {!item.is_active && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                        <span className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs font-medium">غير نشط</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="mb-2 text-sm font-semibold">{item.title}</h3>
                                {item.description && <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">{item.description}</p>}
                                <div className="text-muted-foreground mb-3 flex items-center justify-between text-xs">
                                    <span>ترتيب: {item.sort_order}</span>
                                    <span>{new Date(item.updated_at).toLocaleDateString('ar')}</span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Link
                                        href={`/hero-items/${item.id}/edit`}
                                        className="bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex flex-1 items-center justify-center gap-1 rounded px-3 py-2 text-xs font-medium transition-colors"
                                    >
                                        <Edit className="h-3 w-3" />
                                        تعديل
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/80 inline-flex flex-1 items-center justify-center gap-1 rounded px-3 py-2 text-xs font-medium transition-colors"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                        حذف
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {heroItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="bg-accent mb-4 rounded-full p-4">
                            <Plus className="text-muted-foreground h-8 w-8" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">لا توجد عناصر بطولية</h3>
                        <p className="text-muted-foreground mb-6 text-center text-sm">ابدأ بإضافة عناصر بطولية لتظهر في الصفحة الرئيسية</p>
                        <Link
                            href="/hero-items/create"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-2 text-sm font-medium transition-colors"
                        >
                            إضافة العنصر الأول
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
