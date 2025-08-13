
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Search, ShoppingCart, Store, ChevronDown } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/hooks/use-auth";

const Header = () => {
  const navItems = ["MENS", "WOMENS", "ACCESORIES", "FOOTWEAR", "OTHERS"];
  const { user, viewMode, setViewMode } = useContext(AuthContext);

  const handleSwitchView = () => {
    if (viewMode === 'buying') {
      setViewMode('selling');
    } else {
      setViewMode('buying');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4">
        <div className="flex h-16 items-center">
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 p-4">
                   <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold font-headline">AMMOO.ARCADE</span>
                   </Link>
                  {navItems.map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="transition-colors hover:text-foreground/80 text-foreground"
                    >
                      {item}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="mr-8 flex items-center space-x-2">
            <span className="font-bold sm:inline-block font-headline text-lg tracking-wider">
              AMMOO.ARCADE
            </span>
          </Link>
          
          <div className="flex-1 hidden sm:block mx-auto max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-9 rounded-full bg-secondary border-none" />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2">
            {user?.role === 'creator' && (
              <Button variant="outline" className="hidden lg:inline-flex items-center gap-2 rounded-full" onClick={handleSwitchView}>
                <Store className="h-4 w-4" />
                {viewMode === 'buying' ? 'Switch to Selling' : 'Switch to Buying'}
              </Button>
            )}
            <nav className="flex items-center space-x-1">
              <Button asChild variant="ghost" size="icon" className="relative">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Shopping Cart</span>
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-orange-500 rounded-full">1</span>
                </Link>
              </Button>
              <Link href={user ? "/profile" : "/login"}>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src={user?.avatar || "https://placehold.co/40x40.png"} alt="User avatar" data-ai-hint="user avatar" />
                  <AvatarFallback>{user?.name?.substring(0,1) || 'U'}</AvatarFallback>
                </Avatar>
              </Link>
            </nav>
          </div>
        </div>
        <div className="hidden md:flex h-12 items-center justify-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <DropdownMenu key={item}>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground outline-none">
                {item}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Sub-item 1</DropdownMenuItem>
                <DropdownMenuItem>Sub-item 2</DropdownMenuItem>
                <DropdownMenuItem>Sub-item 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
