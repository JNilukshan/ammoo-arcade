
'use client';

import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, List, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
    { href: "/profile", label: "My Profile", icon: User },
    { href: "/profile/orders", label: "Order History", icon: List },
    { href: "/profile/wishlist", label: "Wishlist", icon: Heart },
];

export default function ProfileLayout({children}: {children: React.ReactNode}) {
    const { user, setUser } = useAuth();
    const pathname = usePathname();

    const handleLogout = () => {
        setUser(null);
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <p>Please log in to view your profile.</p>
                <Button asChild className="mt-4">
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-12 items-start">
                <aside className="md:col-span-1 flex flex-col gap-2">
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href}>
                            <Button 
                                variant={pathname === item.href ? 'default' : 'ghost'} 
                                className="w-full justify-start"
                            >
                                <item.icon className="mr-2 h-4 w-4"/>
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                    <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4"/>
                        Logout
                    </Button>
                </aside>
                <main className="md:col-span-3">
                    {children}
                </main>
            </div>
        </div>
    );
}
