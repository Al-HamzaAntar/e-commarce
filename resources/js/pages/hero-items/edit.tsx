import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: '/dashboard',
    },
    {
        title: 'عناصر البطل',
        href: '/hero-items',
    },
    {
        title: 'تعديل العنصر',
        href: '/hero-items/edit',
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
}

interface HeroItemsEditProps {
    heroItem: HeroItem;
}

export default function HeroItemsEdit({ heroItem }: HeroItemsEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: heroItem.title,
        description: heroItem.description || '',
        image: heroItem.image || '',
        link: heroItem.link || '',
        link_text: heroItem.link_text || '',
        badge_text: heroItem.badge_text || '',
        badge_color: heroItem.badge_color,
        is_active: heroItem.is_active,
        sort_order: heroItem.sort_order,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/hero-items/${heroItem.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`تعديل: ${heroItem.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/hero-items" className="text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">تعديل العنصر البطولي</h1>
                        <p className="text-muted-foreground mt-1 text-sm">تعديل عنصر القسم البطولي في الصفحة الرئيسية</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-6">
                    <div className="border-border/60 bg-card rounded-2xl border p-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Title */}
                            <div className="sm:col-span-2">
                                <label htmlFor="title" className="mb-2 block text-sm font-medium">
                                    العنوان <span className="text-destructive">*</span>
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                    placeholder="أدخل عنوان العنصر البطولي"
                                />
                                {errors.title && <p className="text-destructive mt-1 text-xs">{errors.title}</p>}
                            </div>

                            {/* Description */}
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="mb-2 block text-sm font-medium">
                                    الوصف
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                    placeholder="أدخل وصف العنصر البطولي (اختياري)"
                                />
                                {errors.description && <p className="text-destructive mt-1 text-xs">{errors.description}</p>}
                            </div>

                            {/* Image URL */}
                            <div className="sm:col-span-2">
                                <label htmlFor="image" className="mb-2 block text-sm font-medium">
                                    رابط الصورة
                                </label>
                                <input
                                    id="image"
                                    type="url"
                                    value={data.image}
                                    onChange={(e) => setData('image', e.target.value)}
                                    className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                    placeholder="https://example.com/image.jpg"
                                />
                                {errors.image && <p className="text-destructive mt-1 text-xs">{errors.image}</p>}
                            </div>

                            {/* Link */}
                            <div>
                                <label htmlFor="link" className="mb-2 block text-sm font-medium">
                                    رابط الإجراء
                                </label>
                                <input
                                    id="link"
                                    type="url"
                                    value={data.link}
                                    onChange={(e) => setData('link', e.target.value)}
                                    className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                    placeholder="https://example.com"
                                />
                                {errors.link && <p className="text-destructive mt-1 text-xs">{errors.link}</p>}
                            </div>

                            {/* Link Text */}
                            <div>
                                <label htmlFor="link_text" className="mb-2 block text-sm font-medium">
                                    نص الرابط
                                </label>
                                <input
                                    id="link_text"
                                    type="text"
                                    value={data.link_text}
                                    onChange={(e) => setData('link_text', e.target.value)}
                                    className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                    placeholder="عرض المزيد"
                                />
                                {errors.link_text && <p className="text-destructive mt-1 text-xs">{errors.link_text}</p>}
                            </div>

                            {/* Badge Text */}
                            <div>
                                <label htmlFor="badge_text" className="mb-2 block text-sm font-medium">
                                    نص الشارة
                                </label>
                                <input
                                    id="badge_text"
                                    type="text"
                                    value={data.badge_text}
                                    onChange={(e) => setData('badge_text', e.target.value)}
                                    className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                    placeholder="جديد"
                                />
                                {errors.badge_text && <p className="text-destructive mt-1 text-xs">{errors.badge_text}</p>}
                            </div>

                            {/* Badge Color */}
                            <div>
                                <label htmlFor="badge_color" className="mb-2 block text-sm font-medium">
                                    لون الشارة
                                </label>
                                <select
                                    id="badge_color"
                                    value={data.badge_color}
                                    onChange={(e) => setData('badge_color', e.target.value)}
                                    className="border-border bg-background text-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                >
                                    <option value="primary">أساسي</option>
                                    <option value="secondary">ثانوي</option>
                                    <option value="accent">تأكيد</option>
                                    <option value="destructive">تحذير</option>
                                    <option value="success">نجاح</option>
                                </select>
                                {errors.badge_color && <p className="text-destructive mt-1 text-xs">{errors.badge_color}</p>}
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label htmlFor="sort_order" className="mb-2 block text-sm font-medium">
                                    ترتيب العرض
                                </label>
                                <input
                                    id="sort_order"
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                    className="border-border bg-background text-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                    min="0"
                                />
                                {errors.sort_order && <p className="text-destructive mt-1 text-xs">{errors.sort_order}</p>}
                            </div>

                            {/* Is Active */}
                            <div className="flex items-center gap-2">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked as any)}
                                    className="border-border text-primary focus:ring-primary/20 rounded"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium">
                                    نشط
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            حفظ التغييرات
                        </button>
                        <Link
                            href="/hero-items"
                            className="border-border text-foreground hover:bg-accent inline-flex items-center gap-2 rounded-lg border px-6 py-2 text-sm font-medium transition-colors"
                        >
                            إلغاء
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
