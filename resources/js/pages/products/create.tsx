import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'إدارة المنتجات',
        href: '/products',
    },
    {
        title: 'إضافة منتج جديد',
        href: '/products/create',
    },
];

export default function ProductsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        stock: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/products');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="إضافة منتج جديد" />
            <div className="bg-muted/50 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/products"
                        className="text-muted-foreground hover:bg-accent hover:text-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        العودة
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">إضافة منتج جديد</h1>
                        <p className="text-muted-foreground">أضف منتج جديد إلى المتجر</p>
                    </div>
                </div>

                <div className="bg-card rounded-lg border">
                    <form onSubmit={submit} className="space-y-6 p-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    اسم المنتج *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="border-input bg-background focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                    placeholder="أدخل اسم المنتج"
                                />
                                {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="category" className="text-sm font-medium">
                                    التصنيف *
                                </label>
                                <input
                                    id="category"
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="border-input bg-background focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                    placeholder="مثال: إلكترونيات، ملابس، منزل"
                                />
                                {errors.category && <p className="text-destructive text-sm">{errors.category}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="price" className="text-sm font-medium">
                                    السعر *
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="border-input bg-background focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                    placeholder="0.00"
                                />
                                {errors.price && <p className="text-destructive text-sm">{errors.price}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="stock" className="text-sm font-medium">
                                    الكمية في المخزون *
                                </label>
                                <input
                                    id="stock"
                                    type="number"
                                    min="0"
                                    value={data.stock}
                                    onChange={(e) => setData('stock', e.target.value)}
                                    className="border-input bg-background focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                    placeholder="0"
                                />
                                {errors.stock && <p className="text-destructive text-sm">{errors.stock}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="image" className="text-sm font-medium">
                                رابط الصورة *
                            </label>
                            <input
                                id="image"
                                type="url"
                                value={data.image}
                                onChange={(e) => setData('image', e.target.value)}
                                className="border-input bg-background focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                placeholder="https://example.com/image.jpg"
                            />
                            {errors.image && <p className="text-destructive text-sm">{errors.image}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium">
                                الوصف *
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="border-input bg-background focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                placeholder="وصف تفصيلي للمنتج"
                            />
                            {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                        </div>

                        <div className="flex justify-end gap-4">
                            <Link
                                href="/products"
                                className="border-input hover:bg-accent hover:text-accent-foreground rounded-lg border px-4 py-2 text-sm font-medium"
                            >
                                إلغاء
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />
                                حفظ المنتج
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
