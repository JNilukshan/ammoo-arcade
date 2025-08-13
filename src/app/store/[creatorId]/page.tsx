
"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { findCreatorById, findProductsByCreatorId } from "@/lib/data";
import { StoreProductCard } from "@/components/StoreProductCard";

export default function CreatorStorePage({ params }: { params: Promise<{ creatorId: string }> }) {
  const { creatorId } = use(params);
  const creator = findCreatorById(creatorId);
  const products = findProductsByCreatorId(creatorId);

  if (!creator) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <div className="w-full h-48 bg-gray-200">
        <Image 
          src="https://placehold.co/1200x200.png" 
          alt={`${creator.name}'s banner`}
          width={1200}
          height={200}
          className="w-full h-full object-cover"
          data-ai-hint="store banner"
        />
      </div>
      <div className="container mx-auto px-4 -mt-16">
        <div className="flex flex-col items-center text-center">
            <Avatar className="h-32 w-32 border-4 border-white ring-4 ring-primary">
                <AvatarImage src={creator.avatar} alt={creator.name} data-ai-hint="creator avatar"/>
                <AvatarFallback>{creator.name.substring(0,2)}</AvatarFallback>
            </Avatar>
            <h1 className="font-headline text-4xl font-extrabold mt-4">{creator.name}</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">{creator.bio}</p>
        </div>

        <main className="mt-12">
            <h2 className="font-headline text-2xl font-bold mb-8">ALL PRODUCTS</h2>
            {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <StoreProductCard key={product.id} product={product} />
                ))}
            </div>
            ) : (
            <div className="text-center py-16 border rounded-lg">
                <p className="text-muted-foreground">This creator hasn't added any products yet.</p>
            </div>
            )}
        </main>
      </div>
    </div>
  );
}
