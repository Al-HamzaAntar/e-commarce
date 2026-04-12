import { Link } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="bg-background relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            {/* Subtle background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="bg-primary/5 absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl" />
                <div className="bg-primary/5 absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-3 font-medium">
                            <div className="bg-primary shadow-primary/25 flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg">
                                <ShoppingBag className="text-primary-foreground h-6 w-6" />
                            </div>
                            <span className="text-lg font-bold tracking-tight">متاجرك</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
