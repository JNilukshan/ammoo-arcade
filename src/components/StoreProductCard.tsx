import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/data";
import { Heart } from "lucide-react";

interface StoreProductCardProps {
  product: Product;
}

export function StoreProductCard({ product }: StoreProductCardProps) {
  const oldPrice = product.price * 1.25;
  return (
    <Link href={`/product/${product.id}`} className="group block text-center">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 rounded-lg shadow-sm">
        <div className="border bg-gray-50 aspect-square overflow-hidden relative">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="product image"
            />
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">SALE</div>
          <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 hover:bg-gray-100">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 bg-gray-50 flex-grow flex flex-col">
          <h3 className="font-bold text-base leading-tight hover:underline">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-lg font-extrabold text-red-600">Rs {product.price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground line-through">Rs {oldPrice.toFixed(2)}</span>
          </div>
          <Button asChild className="w-full mt-4 bg-black text-white hover:bg-gray-800 rounded-full" onClick={(e) => { e.preventDefault(); window.location.href='/cart'}}>
            <span className="cursor-pointer">ADD TO CART</span>
          </Button>
        </div>
      </Card>
    </Link>
  );
}
