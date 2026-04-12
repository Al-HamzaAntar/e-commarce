import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    discountedPrice: number;
    image?: string;
    quantity: number;
}

export default function Cart() {
    const { auth } = usePage<SharedData>().props;
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const savedCart = localStorage.getItem('ecomm_cart');
        if (!savedCart) {
            setCartItems([]);
            return;
        }

        try {
            setCartItems(JSON.parse(savedCart));
        } catch {
            setCartItems([]);
        }
    }, []);

    // Listen for localStorage changes to sync cart state across pages
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'ecomm_cart' && e.newValue) {
                try {
                    setCartItems(JSON.parse(e.newValue));
                } catch {
                    setCartItems([]);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Also listen for custom events in case localStorage is updated in the same tab
        const handleCartUpdate = () => {
            const savedCart = localStorage.getItem('ecomm_cart');
            if (savedCart) {
                try {
                    setCartItems(JSON.parse(savedCart));
                } catch {
                    setCartItems([]);
                }
            }
        };

        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const saveCart = (items: CartItem[]) => {
        setCartItems(items);
        if (typeof window === 'undefined') return;
        localStorage.setItem('ecomm_cart', JSON.stringify(items));
    };

    const removeItem = (id: number) => {
        saveCart(cartItems.filter((item) => item.id !== id));
    };

    const totalPrice = useMemo(() => cartItems.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0), [cartItems]);

    return (
        <>
            <Head title="سلة التسوق">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="bg-background text-foreground min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm">سلة التسوق</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight">مراجعة منتجاتك</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href={route('favorites')}
                                className="border-border/70 bg-card text-foreground hover:bg-accent hover:text-foreground inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition-colors"
                            >
                                <ShoppingBag className="h-4 w-4" />
                                المفضلة
                            </Link>
                            <Link
                                href={route('home')}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition-colors"
                            >
                                العودة للمتجر
                            </Link>
                        </div>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="border-border/70 bg-card mt-10 rounded-3xl border p-10 text-center">
                            <p className="text-lg font-semibold">سلة التسوق فارغة</p>
                            <p className="text-muted-foreground mt-2 text-sm">أضف منتجات من الصفحة الرئيسية أو من عروض البطل.</p>
                            <Link
                                href={route('home')}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex rounded-2xl px-6 py-3 text-sm font-semibold transition-colors"
                            >
                                تسوق الآن
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-10 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="border-border/70 bg-card rounded-3xl border p-5 shadow-sm">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                            <div className="bg-accent/20 overflow-hidden rounded-3xl sm:w-40 sm:flex-shrink-0">
                                                <img src={item.image ?? ''} alt={item.name} className="h-32 w-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h2 className="text-foreground text-lg font-semibold">{item.name}</h2>
                                                        <p className="text-muted-foreground mt-1 text-sm">الكمية: {item.quantity}</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        className="border-border/70 bg-card inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm transition-colors hover:bg-red-500 hover:text-white"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        إزالة
                                                    </button>
                                                </div>
                                                <div className="bg-primary/5 text-foreground/90 mt-4 rounded-3xl p-4 text-sm">
                                                    <div>السعر بعد الخصم:</div>
                                                    <div className="text-foreground mt-2 text-lg font-semibold">
                                                        ${item.discountedPrice.toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <aside className="border-border/70 bg-card rounded-3xl border p-6 shadow-sm">
                                <h2 className="text-foreground text-lg font-semibold">المجموع</h2>
                                <p className="text-muted-foreground mt-2 text-sm">السعر الإجمالي بعد الخصم.</p>
                                <div className="bg-primary/5 text-foreground mt-6 rounded-3xl p-5 text-2xl font-semibold">
                                    ${totalPrice.toFixed(2)}
                                </div>
                                <button
                                    type="button"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition-colors"
                                >
                                    متابعة الدفع
                                </button>
                            </aside>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
