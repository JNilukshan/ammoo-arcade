
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import type { Creator, Customer } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) return null;

    const isCustomer = user.role === 'customer';
    
    return (
        <Card>
            <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar || "https://placehold.co/100x100.png"} alt={user.name} data-ai-hint="user avatar"/>
                    <AvatarFallback>{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle>{user.name}</CardTitle>
                <p className="text-muted-foreground">{user.email}</p>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <Separator />
                {isCustomer && (
                     <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold">Shipping Address</p>
                            <div className="text-muted-foreground">
                                <p>{(user as Customer).shippingAddress?.street}</p>
                                <p>{(user as Customer).shippingAddress?.city}, {(user as Customer).shippingAddress?.postalCode}</p>
                                <p>{(user as Customer).shippingAddress?.country}</p>
                            </div>
                        </div>
                        <Button variant="link">Edit</Button>
                    </div>
                )}
                
                <Separator />

                 <div className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold">Password</p>
                        <p className="text-muted-foreground">********</p>
                    </div>
                    <Button variant="link">Change</Button>
                </div>

            </CardContent>
        </Card>
    )
}
