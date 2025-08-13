import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CreatorCard } from "@/components/CreatorCard";
import { ProductCard } from "@/components/ProductCard";
import { featuredCreators, featuredProducts } from "@/lib/data";

const creatorLogos = [
  { name: "PISSU KANNA" },
  { name: "RATTA" },
  { name: "WASTHI" },
  { name: "KAALI" },
  { name: "AMMOO.LK" },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12 relative">
          <div className="absolute inset-0 bg-no-repeat bg-right-top" style={{backgroundImage: "url('/bg-circles.svg')"}}></div>
          <div className="grid md:grid-cols-2 items-center gap-8 relative">
            <div className="text-left">
              <h1 className="font-headline text-6xl lg:text-8xl font-extrabold tracking-tighter text-foreground">
                PISSU KANNA
              </h1>
              <p className="mt-2 text-2xl font-semibold">
                SALE NOW ON !
              </p>
              <p className="mt-2 text-lg text-muted-foreground">
                up to 15% off on products
              </p>
              <Button asChild size="lg" className="mt-6 rounded-full bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg">
                <Link href="#">Shop Now</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center">
                <Image 
                    src="https://placehold.co/500x500.png" 
                    alt="Hero Image"
                    width={500}
                    height={500}
                    className="rounded-lg z-10"
                    data-ai-hint="group photo"
                />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-4">
        <div className="container mx-auto px-4">
            <div className="flex justify-around items-center">
                {creatorLogos.map(logo => (
                    <span key={logo.name} className="font-bold tracking-widest text-lg">{logo.name}</span>
                ))}
            </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-headline text-3xl font-bold">
              Popular Creators
            </h2>
            <Button asChild variant="outline">
              <Link href="#">View More Creators</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {featuredCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
             {featuredCreators.map((creator) => (
               <CreatorCard key={creator.id + '2'} creator={creator} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl font-bold mb-12">
            Popular Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

       <section className="bg-white pb-16 sm:pb-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl font-bold mb-12">
            New Arrivals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={{...product, id: product.id + "-new"}} />
            ))}
             {featuredProducts.map((product) => (
              <ProductCard key={product.id + '2'} product={{...product, id: product.id + "-new2"}} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
