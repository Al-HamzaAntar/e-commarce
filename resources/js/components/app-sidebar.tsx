import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Package, Store } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'لوحة التحكم',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'إدارة المنتجات',
        url: '/products',
        icon: Package,
    },
    {
        title: 'زيارة المتجر',
        url: '/',
        icon: Store,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const isRTL = document.documentElement.dir === 'rtl';

    return (
        <Sidebar collapsible="icon" variant="inset" side={isRTL ? 'right' : 'left'}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
