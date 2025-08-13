
"use client"

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function AddToCartButton() {
    const { toast } = useToast()

    return (
        <Button 
            size="lg" 
            className="w-full bg-black text-white hover:bg-gray-800"
            onClick={() => {
                toast({
                    title: "Added to cart!",
                    description: "You can view your items in the shopping cart.",
                })
            }}
        >
            Add to Cart
        </Button>
    )
}
