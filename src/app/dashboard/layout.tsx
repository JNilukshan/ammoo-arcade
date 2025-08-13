
'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BarChart, Edit, Package, ShoppingCart, Menu, Store } from 'lucide-react';

const navItems = [
    { href: "/dashboard", icon: BarChart, label: "Sales Overview" },
    { href: "/dashboard/products", icon: Package, label: "Products" },
    { href: "/dashboard/orders", icon: ShoppingCart, label: "Orders" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setViewMode } = useContext(AuthContext);
  const pathname = usePathname();

  return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
                <div className="flex flex-col items-center gap-4 p-6 border-b">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user?.avatar || "https://placehold.co/100x100.png"} alt={user?.name} data-ai-hint="creator avatar"/>
                        <AvatarFallback>{user?.name?.substring(0,2) || 'U'}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{user?.name}</h2>
                    <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                </div>
                <nav className="flex-1 p-4 text-sm font-medium">
                    <ul className="space-y-1">
                        {navItems.map(item => (
                            <li key={item.href}>
                                <Link href={item.href}>
                                    <span className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'}`}>
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-auto p-4 border-t">
                    <Button variant="outline" className="w-full" onClick={() => setViewMode('buying')}>
                        <Store className="mr-2 h-4 w-4" /> Switch to Buying
                    </Button>
                </div>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
                 <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs p-0">
                             <div className="flex flex-col h-full">
                                <div className="flex flex-col items-center gap-4 p-6 border-b">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={user?.avatar || "https://placehold.co/100x100.png"} alt={user?.name} data-ai-hint="creator avatar"/>
                                        <AvatarFallback>{user?.name?.substring(0,2) || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-semibold">{user?.name}</h2>
                                </div>
                                <nav className="grid gap-2 text-lg font-medium p-4">
                                    {navItems.map(item => (
                                        <Link key={item.href} href={item.href}>
                                            <span className={`flex items-center gap-4 rounded-xl px-3 py-2  transition-all hover:text-primary ${pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'}`}>
                                                <item.icon className="h-5 w-5" />
                                                {item.label}
                                            </span>
                                        </Link>
                                    ))}
                                </nav>
                                <div className="mt-auto p-4 border-t">
                                    <Button variant="outline" className="w-full" onClick={() => setViewMode('buying')}>
                                        <Store className="mr-2 h-4 w-4" /> Switch to Buying
                                    </Button>
                                </div>
                             </div>
                        </SheetContent>
                    </Sheet>
                     <div className="flex-1">
                        <h1 className="font-semibold text-lg">
                            {navItems.find(item => pathname.startsWith(item.href))?.label || 'Dashboard'}
                        </h1>
                    </div>
                </header>
                 <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
  );
}
