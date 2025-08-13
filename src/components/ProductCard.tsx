import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
        <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 border-none shadow-none rounded-none">
          <Link href={`/product/${product.id}`} className="block aspect-square overflow-hidden relative">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="product image"
              />
               <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">SAVE 15%</div>
          </Link>
          <CardContent className="p-4 flex-grow flex flex-col bg-white">
            <Link href={`/product/${product.id}`}>
              <h3 className="font-headline text-base font-bold leading-tight hover:underline">{product.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">Rs. 2,190.00 <span className="line-through">Rs. 2,500.00</span></p>
            <Button asChild className="w-full mt-4 bg-black text-white hover:bg-gray-800 rounded-none">
                <Link href="/cart">ADD TO CART</Link>
            </Button>
          </CardContent>
        </Card>
    </div>
  );
}