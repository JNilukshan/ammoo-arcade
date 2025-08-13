
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BarChart, Menu, Package, ShoppingCart, Users, LogOut, Home } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

const navItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/sellers", label: "Sellers", icon: Package },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setUser, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role !== 'admin') {
      router.push('/login');
    }
  }, [user, loading, router]);


  if (loading || user?.role !== 'admin') {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    router.push('/login');
  }

  const PageTitle = navItems.find(item => pathname === item.href)?.label || 'Dashboard';

  return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                        <span className="font-headline tracking-wider">AMMOO.ARCADE</span>
                    </Link>
                </div>
                 <div className="flex flex-col p-4">
                    <p className="text-sm font-semibold text-muted-foreground">Admin Dashboard</p>
                </div>
                <nav className="flex-1 p-4 text-sm font-medium">
                    <ul className="space-y-2">
                        {navItems.map(item => (
                            <li key={item.href}>
                                <Link href={item.href}>
                                    <span className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted hover:text-primary ${pathname === item.href ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground' : 'text-muted-foreground'}`}>
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-auto p-4 border-t">
                    <Button variant="default" className="w-full" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> Log Out
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
                            <div className="flex h-full flex-col">
                                 <div className="flex h-16 items-center border-b px-6">
                                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                                        <span className="font-headline tracking-wider">AMMOO.ARCADE</span>
                                    </Link>
                                </div>
                                <div className="flex flex-col p-4">
                                     <p className="text-sm font-semibold text-muted-foreground">Admin Dashboard</p>
                                </div>
                                <nav className="flex-1 p-4 text-base font-medium">
                                     <ul className="space-y-2">
                                        {navItems.map(item => (
                                            <li key={item.href}>
                                                <Link href={item.href}>
                                                    <span className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted hover:text-primary ${pathname === item.href ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground' : 'text-muted-foreground'}`}>
                                                        <item.icon className="h-5 w-5" />
                                                        {item.label}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                                <div className="mt-auto p-4 border-t">
                                    <Button variant="default" className="w-full" onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" /> Log Out
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                     <div className="flex-1">
                        <h1 className="font-semibold text-lg">
                           {PageTitle}
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
