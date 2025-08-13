import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmationPage() {
  const orderId = "CCL-1827-4927";
  const total = 75.00;

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="font-headline text-2xl sm:text-3xl mt-4">Thank You For Your Order!</CardTitle>
          <p className="text-muted-foreground">
            Your order has been confirmed. A confirmation email has been sent to you.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-mono font-semibold text-lg">{orderId}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
               <div className="flex justify-between">
                  <span>Pixel Pundit Classic Tee (x1)</span>
                  <span>$24.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Chic 'Maven' Tote Bag (x2)</span>
                  <span>$69.98</span>
                </div>
                <Separator className="my-2" />
                 <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$94.97</span>
                </div>
                 <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                 <Separator className="my-2" />
                <div className="flex justify-between font-bold text-base text-foreground">
                  <span>Total Paid</span>
                  <span>${total.toFixed(2)}</span>
                </div>
            </div>
          </div>
          
          <div className="text-center">
             <p className="text-sm text-muted-foreground">Estimated delivery: <span className="font-medium text-foreground">3-5 business days</span></p>
          </div>
          
          <Button asChild className="w-full" variant="outline">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
