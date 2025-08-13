
"use client"

import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { allProducts } from "@/lib/data"
import type { Product } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddProductDialog } from "@/components/dashboard/AddProductDialog"
import { EditProductDialog } from "@/components/dashboard/EditProductDialog"
import { useState } from "react"

const creatorProducts = allProducts.filter(p => p.creatorId === 'creator-1');

export default function DashboardProductsPage() {
  const [products, setProducts] = useState(creatorProducts);

  const handleAddProduct = (newProduct: Omit<Product, 'id' | 'creatorId' | 'creator' | 'images'> & { images: File[] }) => {
    const productToAdd: Product = {
      id: `prod-${Date.now()}`,
      creatorId: 'creator-1',
      creator: 'Pixel Pundit',
      ...newProduct,
      images: newProduct.images.map(file => URL.createObjectURL(file))
    };
    setProducts(prev => [productToAdd, ...prev]);
  };

  const handleEditProduct = (editedProduct: Product, newImages: File[]) => {
    setProducts(prev => prev.map(p => {
      if (p.id === editedProduct.id) {
        const updatedImages = newImages.length > 0 
          ? newImages.map(file => URL.createObjectURL(file))
          : editedProduct.images;
        return { ...editedProduct, images: updatedImages };
      }
      return p;
    }));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };


  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline">
            Export
          </Button>
          <AddProductDialog onAddProduct={handleAddProduct} />
        </div>
      </div>
      <TabsContent value="all">
        <Card>
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                Manage your products and view their sales performance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden md:table-cell">
                        Total Sales
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map(product => (
                        <TableRow key={product.id}>
                            <TableCell className="hidden sm:table-cell">
                                <Image
                                alt={product.name}
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={product.images[0]}
                                width="64"
                                data-ai-hint="product thumbnail"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>
                                <Badge variant="outline">Active</Badge>
                            </TableCell>
                            <TableCell>Rs. {product.price.toFixed(2)}</TableCell>
                            <TableCell className="hidden md:table-cell">25</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <EditProductDialog
                                      product={product}
                                      onEditProduct={handleEditProduct}
                                      trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>}
                                    />
                                    <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-red-600">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
             <CardFooter>
                <div className="text-xs text-muted-foreground">
                Showing <strong>{products.length}</strong> of <strong>{products.length}</strong> products
                </div>
            </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
