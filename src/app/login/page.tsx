
"use client"

import React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useContext } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Customer, Creator, Admin, User } from "@/lib/models"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { AuthContext } from "@/hooks/use-auth"


const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

const sampleCustomer: Customer = {
  id: "cust_123",
  email: "customer@example.com",
  password: "password123",
  name: "John Doe",
  role: 'customer',
  shippingAddress: {
    street: "123 Main St",
    city: "Anytown",
    postalCode: "12345",
    country: "USA",
  },
  orderIds: ["order_abc", "order_xyz"],
  createdAt: new Date(),
};

const sampleCreator: Creator = {
  id: "creator_456",
  email: "creator@example.com",
  password: "password123",
  name: "Jane Smith",
  role: 'creator',
  bio: "Creating amazing content and products.",
  storeName: "Jane's Creations",
  createdAt: new Date(),
};

const sampleAdmin: Admin = {
  id: "admin_789",
  email: "admin@example.com",
  password: "password123",
  name: "Admin User",
  role: 'admin',
  permissions: ['manage_users', 'manage_products'],
  createdAt: new Date(),
};

const allUsers: User[] = [sampleCustomer, sampleCreator, sampleAdmin];

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const user = allUsers.find(u => u.email === values.email);

    if (!user) {
      form.setError("email", { type: "manual", message: "No user found with this email." });
      return;
    }

    if (user.password !== values.password) {
      form.setError("password", { type: "manual", message: "Incorrect password." });
      return;
    }

    toast({
        title: "Login Successful!",
        description: `Welcome back, ${user.name}!`,
    });
    setUser(user);

    if (user.role === 'admin') {
      router.push('/admin');
    } else if (user.role === 'creator') {
       router.push('/');
    } else {
       router.push('/');
    }
  }

  return (
    <div className="container py-12 px-4">
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" style={{backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))"}}>
                  Login
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="w-full max-w-2xl space-y-8">
            <h2 className="text-2xl font-headline font-bold text-center">Sample User Credentials</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Customer</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm font-mono"><b>Email:</b> {sampleCustomer.email}</p>
                    <p className="text-sm font-mono"><b>Password:</b> {sampleCustomer.password}</p>
                    <Separator className="my-4"/>
                    <h4 className="font-bold mb-2">Full Data Model:</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto"><code>{JSON.stringify({
                        ...sampleCustomer,
                        createdAt: sampleCustomer.createdAt.toISOString()
                    }, null, 2)}</code></pre>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Creator</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm font-mono"><b>Email:</b> {sampleCreator.email}</p>
                    <p className="text-sm font-mono"><b>Password:</b> {sampleCreator.password}</p>
                    <Separator className="my-4"/>
                    <h4 className="font-bold mb-2">Full Data Model:</h4>
                     <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto"><code>{JSON.stringify({
                        ...sampleCreator,
                        createdAt: sampleCreator.createdAt.toISOString()
                    }, null, 2)}</code></pre>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Admin</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm font-mono"><b>Email:</b> {sampleAdmin.email}</p>
                    <p className="text-sm font-mono"><b>Password:</b> {sampleAdmin.password}</p>
                    <Separator className="my-4"/>
                    <h4 className="font-bold mb-2">Full Data Model:</h4>
                     <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto"><code>{JSON.stringify({
                        ...sampleAdmin,
                        createdAt: sampleAdmin.createdAt.toISOString()
                     }, null, 2)}</code></pre>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}

