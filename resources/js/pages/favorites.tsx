import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type FavoriteSlide =
    | {
          slideType: 'product';
          id: number;
          name: string;
          price: number;
          discountedPrice: number;
          image?: string;
      }
    | {
          slideType: 'hero';
          id: number;
          title: string;
          description?: string;
          image?: string;
          link?: string;
          link_text?: string;
          badge_text?: string;
          badge_color: string;
      };

export default function Favorites() {
    const { auth } = usePage<SharedData>().props;
    const [favoriteItems, setFavoriteItems] = useState<FavoriteSlide[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const savedFavorites = localStorage.getItem('ecomm_favorites');
        if (!savedFavorites) {
            setFavoriteItems([]);
            return;
        }

        try {
            setFavoriteItems(JSON.parse(savedFavorites));
        } catch {
            setFavoriteItems([]);
        }
    }, []);

    // Listen for localStorage changes to sync favorites state across pages
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'ecomm_favorites' && e.newValue) {
                try {
                    setFavoriteItems(JSON.parse(e.newValue));
                } catch {
                    setFavoriteItems([]);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Also listen for custom events in case localStorage is updated in the same tab
        const handleFavoritesUpdate = () => {
            const savedFavorites = localStorage.getItem('ecomm_favorites');
            if (savedFavorites) {
                try {
                    setFavoriteItems(JSON.parse(savedFavorites));
                } catch {
                    setFavoriteItems([]);
                }
            }
        };

        window.addEventListener('favoritesUpdated', handleFavoritesUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
        };
    }, []);

    const saveFavorites = (items: FavoriteSlide[]) => {
        setFavoriteItems(items);
        if (typeof window === 'undefined') return;
        localStorage.setItem('ecomm_favorites', JSON.stringify(items));
    };

    const removeFavorite = (id: number) => {
        saveFavorites(favoriteItems.filter((item) => item.id !== id));
    };

    const addToCartFromFavorite = (item: FavoriteSlide) => {
        if (typeof window === 'undefined' || item.slideType !== 'product') return;

        const savedCart = localStorage.getItem('ecomm_cart');
        let currentCart = [] as Array<{ id: number; name: string; price: number; discountedPrice: number; image?: string; quantity: number }>;
        if (savedCart) {
            try {
                currentCart = JSON.parse(savedCart);
            } catch {
                currentCart = [];
            }
        }

        const existing = currentCart.find((cartItem) => cartItem.id === item.id);
        const nextCart = existing
            ? currentCart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
            : [...currentCart, { ...item, quantity: 1 }];

        localStorage.setItem('ecomm_cart', JSON.stringify(nextCart));
    };

    return (
        <>
            <Head title="المفضلة">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="bg-background text-foreground min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm">صفحة المفضلة</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight">المنتجات المفضلة</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href={route('cart')}
                                className="border-border/70 bg-card text-foreground hover:bg-accent hover:text-foreground inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition-colors"
                            >
                                <ShoppingBag className="h-4 w-4" />
                                سلة التسوق
                            </Link>
                            <Link
                                href={route('home')}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition-colors"
                            >
                                العودة للمتجر
                            </Link>
                        </div>
                    </div>

                    {favoriteItems.length === 0 ? (
                        <div className="border-border/70 bg-card mt-10 rounded-3xl border p-10 text-center">
                            <p className="text-lg font-semibold">لم تتم إضافة أي عنصر للمفضلة بعد</p>
                            <p className="text-muted-foreground mt-2 text-sm">يمكنك إضافة المنتجات المفضلة من قسم العروض أو الصفحة الرئيسية.</p>
                            <Link
                                href={route('home')}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex rounded-2xl px-6 py-3 text-sm font-semibold transition-colors"
                            >
                                عرض المتجر
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-10 space-y-4">
                            {favoriteItems.map((item) => (
                                <div key={`${item.slideType}-${item.id}`} className="border-border/70 bg-card rounded-3xl border p-5 shadow-sm">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-accent/20 h-24 w-24 shrink-0 overflow-hidden rounded-3xl">
                                                <img
                                                    src={item.image ?? ''}
                                                    alt={item.slideType === 'product' ? item.name : item.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h2 className="text-foreground text-lg font-semibold">
                                                    {item.slideType === 'product' ? item.name : item.title}
                                                </h2>
                                                <p className="text-muted-foreground mt-1 text-sm">
                                                    {item.slideType === 'product'
                                                        ? `السعر بعد الخصم: $${item.discountedPrice.toFixed(2)}`
                                                        : (item.description ?? 'عنصر مفضل')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            {item.slideType === 'product' && (
                                                <button
                                                    type="button"
                                                    onClick={() => addToCartFromFavorite(item)}
                                                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl px-4 py-2 text-sm font-semibold transition-colors"
                                                >
                                                    إضافة للعربة
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => removeFavorite(item.id)}
                                                className="border-border/70 bg-card inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm transition-colors hover:bg-red-500 hover:text-white"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                إزالة
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
