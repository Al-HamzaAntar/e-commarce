import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'إدارة المنتجات',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    created_at: string;
    updated_at: string;
}

interface ProductsIndexProps {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function ProductsIndex({ products }: ProductsIndexProps) {
    const handleDelete = (productId: number) => {
        if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            router.delete(`/products/${productId}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="إدارة المنتجات" />
            <div className="bg-muted/50 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">إدارة المنتجات</h1>
                        <p className="text-muted-foreground">إدارة وتعديل المنتجات في المتجر</p>
                    </div>
                    <Link
                        href="/products/create"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        إضافة منتج جديد
                    </Link>
                </div>

                <div className="bg-card rounded-lg border">
                    <div className="p-6">
                        {products.data.length > 0 ? (
                            <div className="space-y-4">
                                {products.data.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="flex items-center gap-4">
                                            <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                                            <div>
                                                <h3 className="font-semibold">{product.name}</h3>
                                                <p className="text-muted-foreground text-sm">{product.category}</p>
                                                <p className="text-sm font-medium">${product.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs ${
                                                    product.stock > 10
                                                        ? 'bg-green-100 text-green-800'
                                                        : product.stock > 0
                                                          ? 'bg-yellow-100 text-yellow-800'
                                                          : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {product.stock} في المخزون
                                            </span>
                                            <Link
                                                href={`/products/${product.id}`}
                                                className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg p-2"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={`/products/${product.id}/edit`}
                                                className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg p-2"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground rounded-lg p-2"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <div className="bg-muted mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                                    <Plus className="text-muted-foreground h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold">لا توجد منتجات</h3>
                                <p className="text-muted-foreground">ابدأ بإضافة منتجك الأول</p>
                                <Link
                                    href="/products/create"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
                                >
                                    <Plus className="h-4 w-4" />
                                    إضافة منتج جديد
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
