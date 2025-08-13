
"use client"

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { findProductById } from "@/lib/data";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Heart, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params);
  const product = findProductById(productId);
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    notFound();
  }

  const [mainImage, setMainImage] = useState(product.images[0]);
  
  const oldPrice = product.price * 1.25;

  const handleWishlist = () => {
    toast({
        title: "Added to wishlist!",
        description: "You can view your items in your wishlist.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="md:sticky top-24">
            <div className="border rounded-lg overflow-hidden mb-4">
               <Image
                    src={mainImage}
                    alt={`${product.name} image`}
                    width={600}
                    height={600}
                    className="object-cover w-full aspect-square"
                    data-ai-hint="product image"
                />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, index) => (
                 <button key={index} onClick={() => setMainImage(img)} className={`border rounded-lg overflow-hidden ${mainImage === img ? 'border-primary' : ''}`}>
                    <Image
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        width={100}
                        height={100}
                        className="object-cover w-full aspect-square"
                        data-ai-hint="product thumbnail"
                    />
                 </button>
              ))}
            </div>
        </div>

        <div>
          <h1 className="font-headline text-3xl sm:text-4xl font-extrabold">{product.name}</h1>
          <div className="flex items-baseline gap-4 mt-4">
            <span className="text-2xl font-bold">Rs {product.price.toFixed(2)}</span>
            <span className="text-xl text-muted-foreground line-through">Rs {oldPrice.toFixed(2)}</span>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" asChild style={{backgroundColor: "hsl(39 100% 50%)", color: "hsl(var(--primary-foreground))"}}>
              <Link href={`/store/${product.creatorId}`}>View Shop</Link>
            </Button>
          </div>

          <div className="mt-8 text-sm text-muted-foreground space-y-2">
            <p>- FABRIC COMPOSITION: POLYESTER MIXED COTTON</p>
            <p>- FABRIC PATTERN: PRINT</p>
            <p>- FIT TYPE: COMFORT FIT</p>
            <p>- LENGTH: MID-THIGH/KNEE LENGTH</p>
            <p>- WASH CARE INSTRUCTIONS: MACHINE WASH</p>
            <p>- DECOR FEATURES: COMFORTABLE, DAILY STYLISH, SUBSTAIN BRANDING, CMG, INSTRUCTIONS ON SATIN CARE LABEL FOR MACHINE WASH, BEST STORE, COMFORTABLE, BEST SMALL.</p>
            <br />
            <p>* PLEASE REMEMBER THAT THE SHADE BE SLIGHTLY WAY FROM DISPLAY IMAGE IN TERMS OF COLOR DUE TO LIGHTING CONDITIONS OR THE DISPLAY USED TO VIEW, AND THE FABRIC MATERIAL FROM COLOR TO COLOR AND SIZE TO SIZE.</p>
          </div>

          <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border rounded-full">
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setQuantity(q => Math.max(1, q-1))}>
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                 <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setQuantity(q => q+1)}>
                    <Plus className="h-4 w-4" />
                </Button>
              </div>
          </div>
          
          <div className="mt-6 flex items-center gap-4">
            <Button variant="outline" size="lg" className="w-full bg-gray-200 hover:bg-gray-300" onClick={handleWishlist}>
              Add to Wishlist
            </Button>
            <AddToCartButton />
          </div>
        </div>
      </div>
    </div>
  );
}
