import { ShoppingBag } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-xl">
                <ShoppingBag className="size-4" />
            </div>
            <div className="mr-1.5 grid flex-1 text-right text-sm">
                <span className="mb-0.5 truncate leading-none font-bold tracking-tight">متاجرك</span>
            </div>
        </>
    );
}
