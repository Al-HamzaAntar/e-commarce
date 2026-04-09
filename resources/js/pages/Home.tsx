import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Headphones, Heart, Menu, RotateCcw, Search, Shield, ShoppingBag, Sparkles, Star, Truck, X } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
}

interface HomeProps {
    products: Product[];
}

export default function Home({ products }: HomeProps) {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

    const categories = useMemo(() => {
        const cats = ['All', ...new Set(products.map((p) => p.category))];
        return cats;
    }, [products]);

    const filteredProducts = useMemo(() => {
        let result = products;
        if (selectedCategory !== 'All') {
            result = result.filter((p) => p.category === selectedCategory);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
            );
        }
        return result;
    }, [products, selectedCategory, searchQuery]);

    return (
        <>
            <Head title="Shop - Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="bg-background text-foreground min-h-screen">
                {/* Announcement Bar */}
                <div className="bg-primary text-primary-foreground">
                    <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 text-xs font-medium tracking-wide sm:text-sm">
                        <Truck className="mr-2 h-3.5 w-3.5" />
                        Free shipping on orders over $50 — Shop now
                    </div>
                </div>

                {/* Navigation */}
                <header className="border-border/50 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-xl">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between lg:h-18">
                            {/* Mobile menu toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-foreground/70 hover:bg-accent hover:text-foreground rounded-lg p-2 transition-colors lg:hidden"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>

                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2.5">
                                <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-xl">
                                    <ShoppingBag className="text-primary-foreground h-5 w-5" />
                                </div>
                                <span className="text-xl font-bold tracking-tight">ShopVibe</span>
                            </Link>

                            {/* Desktop nav links */}
                            <nav className="hidden items-center gap-1 lg:flex">
                                {categories.slice(0, 5).map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                                            selectedCategory === cat
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </nav>

                            {/* Right side actions */}
                            <div className="flex items-center gap-1 sm:gap-2">
                                {/* Search toggle */}
                                <button
                                    onClick={() => setSearchOpen(!searchOpen)}
                                    className="text-foreground/70 hover:bg-accent hover:text-foreground rounded-lg p-2 transition-colors"
                                    aria-label="Search"
                                >
                                    <Search className="h-5 w-5" />
                                </button>

                                {/* Wishlist */}
                                <button
                                    className="text-foreground/70 hover:bg-accent hover:text-foreground hidden rounded-lg p-2 transition-colors sm:inline-flex"
                                    aria-label="Wishlist"
                                >
                                    <Heart className="h-5 w-5" />
                                </button>

                                {/* Cart */}
                                <button
                                    className="text-foreground/70 hover:bg-accent hover:text-foreground relative rounded-lg p-2 transition-colors"
                                    aria-label="Cart"
                                >
                                    <ShoppingBag className="h-5 w-5" />
                                    <span className="bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] font-bold">
                                        0
                                    </span>
                                </button>

                                {/* Auth links */}
                                <div className="border-border/50 ml-1 hidden items-center gap-2 border-l pl-3 sm:flex">
                                    {auth?.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/25 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:shadow-lg"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="text-foreground/70 hover:bg-accent hover:text-foreground rounded-lg px-3.5 py-2 text-sm font-medium transition-colors"
                                            >
                                                Sign in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/25 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:shadow-lg"
                                            >
                                                Sign up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Search bar - expandable */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                searchOpen ? 'max-h-20 pb-4 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="relative">
                                <Search className="text-muted-foreground absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search products, categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-border bg-accent/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-xl border py-3 pr-4 pl-11 text-sm focus:ring-2 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Mobile menu */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
                                mobileMenuOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <nav className="border-border/50 flex flex-col gap-1 border-t pt-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setMobileMenuOpen(false);
                                            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className={`rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                                            selectedCategory === cat
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                                {/* Mobile auth links */}
                                <div className="border-border/50 mt-2 flex flex-col gap-2 border-t pt-3 sm:hidden">
                                    {auth?.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="bg-primary text-primary-foreground rounded-lg px-4 py-2.5 text-center text-sm font-medium"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="border-border text-foreground rounded-lg border px-4 py-2.5 text-center text-sm font-medium"
                                            >
                                                Sign in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="bg-primary text-primary-foreground rounded-lg px-4 py-2.5 text-center text-sm font-medium"
                                            >
                                                Sign up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    {/* Gradient background */}
                    <div className="from-primary/5 via-background to-accent/30 absolute inset-0 bg-gradient-to-br" />
                    <div className="bg-primary/10 absolute top-20 -right-20 h-72 w-72 rounded-full blur-3xl" />
                    <div className="bg-chart-4/10 absolute -bottom-10 -left-20 h-72 w-72 rounded-full blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
                        <div className="flex flex-col items-center text-center">
                            <div className="border-primary/20 bg-primary/5 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium">
                                <Sparkles className="h-3.5 w-3.5" />
                                New Collection Available
                            </div>
                            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                                Discover Your
                                <span className="relative ml-2">
                                    <span className="from-primary to-chart-4 bg-gradient-to-r bg-clip-text text-transparent">Style</span>
                                </span>
                            </h1>
                            <p className="text-muted-foreground mt-6 max-w-2xl text-base sm:text-lg md:text-xl">
                                Curated collections of premium products designed for the modern lifestyle. Quality craftsmanship meets contemporary
                                design.
                            </p>
                            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                                <button
                                    onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="group bg-primary text-primary-foreground shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/30 flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold shadow-lg transition-all hover:shadow-xl sm:w-auto"
                                >
                                    Shop Now
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </button>
                                <button className="border-border text-foreground hover:bg-accent w-full rounded-xl border px-7 py-3.5 text-sm font-semibold transition-all sm:w-auto">
                                    View Lookbook
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="mt-16 grid grid-cols-3 gap-6 sm:gap-12">
                                <div className="text-center">
                                    <div className="text-2xl font-bold sm:text-3xl">2K+</div>
                                    <div className="text-muted-foreground mt-1 text-xs sm:text-sm">Products</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold sm:text-3xl">15K+</div>
                                    <div className="text-muted-foreground mt-1 text-xs sm:text-sm">Happy Customers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold sm:text-3xl">4.9</div>
                                    <div className="text-muted-foreground mt-1 flex items-center justify-center gap-1 text-xs sm:text-sm">
                                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                        Rating
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Pills (mobile-friendly horizontal scroll) */}
                {categories.length > 1 && (
                    <section className="border-border/50 border-b lg:hidden">
                        <div className="mx-auto max-w-7xl px-4 py-3">
                            <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                            selectedCategory === cat
                                                ? 'bg-primary text-primary-foreground shadow-primary/25 shadow-md'
                                                : 'bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Products Section */}
                <section id="products" className="scroll-mt-20">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                    {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                                </h2>
                                <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
                                </p>
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className="group border-border/50 bg-card hover:border-border relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl hover:shadow-black/5"
                                        onMouseEnter={() => setHoveredProduct(product.id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        {/* Image */}
                                        <div className="bg-accent/50 relative aspect-square overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            {/* Quick action overlay */}
                                            <div
                                                className={`absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent p-4 transition-opacity duration-300 ${
                                                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            >
                                                <button className="w-full rounded-xl bg-white/95 py-2.5 text-sm font-semibold text-gray-900 backdrop-blur-sm transition-all hover:bg-white">
                                                    Quick View
                                                </button>
                                            </div>
                                            {/* Wishlist button */}
                                            <button className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-gray-600 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-red-500 hover:shadow-md">
                                                <Heart className="h-4 w-4" />
                                            </button>
                                            {/* Stock badge */}
                                            {product.stock <= 5 && product.stock > 0 && (
                                                <div className="absolute top-3 left-3 rounded-full bg-orange-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                                    Only {product.stock} left
                                                </div>
                                            )}
                                            {product.stock === 0 && (
                                                <div className="absolute top-3 left-3 rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                                    Sold Out
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 sm:p-5">
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-medium">
                                                    {product.category}
                                                </span>
                                                <div className="flex items-center gap-0.5 text-yellow-500">
                                                    <Star className="h-3 w-3 fill-current" />
                                                    <span className="text-muted-foreground text-xs font-medium">4.8</span>
                                                </div>
                                            </div>
                                            <h3 className="text-card-foreground mb-1.5 text-sm leading-snug font-semibold sm:text-base">
                                                {product.name}
                                            </h3>
                                            <p className="text-muted-foreground mb-3 line-clamp-2 text-xs sm:text-sm">{product.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-baseline gap-1.5">
                                                    <span className="text-foreground text-lg font-bold sm:text-xl">
                                                        ${Number(product.price).toFixed(2)}
                                                    </span>
                                                </div>
                                                <button
                                                    className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
                                                        product.stock > 0
                                                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/25 shadow-sm hover:shadow-md'
                                                            : 'bg-muted text-muted-foreground cursor-not-allowed'
                                                    }`}
                                                    disabled={product.stock === 0}
                                                >
                                                    {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="bg-accent mb-4 rounded-full p-4">
                                    <Search className="text-muted-foreground h-8 w-8" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">No products found</h3>
                                <p className="text-muted-foreground mb-6 text-center text-sm">
                                    {searchQuery
                                        ? `No results for "${searchQuery}". Try a different search term.`
                                        : 'No products available in this category yet.'}
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setSearchQuery('');
                                    }}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-2.5 text-sm font-medium transition-all"
                                >
                                    Browse All Products
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Features / Trust Badges */}
                <section className="border-border/50 bg-accent/30 border-t">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                            {[
                                {
                                    icon: Truck,
                                    title: 'Free Shipping',
                                    desc: 'On orders over $50',
                                },
                                {
                                    icon: Shield,
                                    title: 'Secure Payment',
                                    desc: '100% protected checkout',
                                },
                                {
                                    icon: RotateCcw,
                                    title: 'Easy Returns',
                                    desc: '30-day return policy',
                                },
                                {
                                    icon: Headphones,
                                    title: '24/7 Support',
                                    desc: 'We are here to help',
                                },
                            ].map((feature) => (
                                <div
                                    key={feature.title}
                                    className="border-border/50 bg-card hover:border-border flex items-center gap-4 rounded-2xl border p-5 transition-all hover:shadow-md"
                                >
                                    <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                                        <feature.icon className="text-primary h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-card-foreground text-sm font-semibold">{feature.title}</h3>
                                        <p className="text-muted-foreground text-xs sm:text-sm">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="bg-primary relative overflow-hidden">
                    <div className="from-primary via-primary to-chart-4/50 absolute inset-0 bg-gradient-to-r" />
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-primary-foreground text-2xl font-bold sm:text-3xl">Stay in the Loop</h2>
                            <p className="text-primary-foreground/80 mt-3 max-w-md text-sm sm:text-base">
                                Subscribe to our newsletter for exclusive deals, new arrivals, and style inspiration.
                            </p>
                            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="text-primary-foreground placeholder:text-primary-foreground/50 flex-1 rounded-xl border-0 bg-white/15 px-5 py-3 text-sm backdrop-blur-sm focus:bg-white/20 focus:ring-2 focus:ring-white/30 focus:outline-none"
                                />
                                <button className="text-primary rounded-xl bg-white px-6 py-3 text-sm font-semibold transition-all hover:bg-white/90 hover:shadow-lg">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-border/50 bg-card border-t">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
                            {/* Brand */}
                            <div className="col-span-2 lg:col-span-1">
                                <Link href="/" className="inline-flex items-center gap-2.5">
                                    <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-xl">
                                        <ShoppingBag className="text-primary-foreground h-5 w-5" />
                                    </div>
                                    <span className="text-lg font-bold tracking-tight">ShopVibe</span>
                                </Link>
                                <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
                                    Your destination for premium products and modern style. Curated with care, delivered with love.
                                </p>
                            </div>

                            {/* Links */}
                            <div>
                                <h3 className="mb-4 text-sm font-semibold">Shop</h3>
                                <ul className="space-y-3">
                                    {['New Arrivals', 'Best Sellers', 'Sale', 'Collections'].map((item) => (
                                        <li key={item}>
                                            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 text-sm font-semibold">Support</h3>
                                <ul className="space-y-3">
                                    {['Contact Us', 'FAQ', 'Shipping & Returns', 'Size Guide'].map((item) => (
                                        <li key={item}>
                                            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="hidden lg:block">
                                <h3 className="mb-4 text-sm font-semibold">Company</h3>
                                <ul className="space-y-3">
                                    {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item) => (
                                        <li key={item}>
                                            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="border-border/50 mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
                            <p className="text-muted-foreground text-xs">&copy; {new Date().getFullYear()} ShopVibe. All rights reserved.</p>
                            <div className="flex items-center gap-4">
                                <a href="#" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
                                    Privacy
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
                                    Terms
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
                                    Cookies
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
