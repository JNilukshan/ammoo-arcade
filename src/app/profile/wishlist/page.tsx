
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { allProducts } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"

const wishlistItems = allProducts.slice(0,3);

export default function WishlistPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
                {wishlistItems.length > 0 ? (
                    <div className="space-y-4">
                        {wishlistItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-2 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <Image src={item.images[0]} alt={item.name} width={64} height={64} className="rounded-md" data-ai-hint="product image"/>
                                    <div>
                                        <Link href={`/product/${item.id}`} className="font-semibold hover:underline">{item.name}</Link>
                                        <p className="text-muted-foreground">Rs. {item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm">Add to Cart</Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Your wishlist is empty.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
