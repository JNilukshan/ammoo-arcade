
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import type { Product } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditProductDialogProps {
  product: Product;
  onEditProduct: (product: Product, newImages: File[]) => void;
  trigger: React.ReactNode;
}

export function EditProductDialog({ product, onEditProduct, trigger }: EditProductDialogProps) {
  const [open, setOpen] = useState(false);

  const handleFormSubmit = (data: Omit<Product, 'id' | 'creatorId' | 'creator'>, images: File[]) => {
    onEditProduct({ ...data, id: product.id, creatorId: product.creatorId, creator: product.creator }, images);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the details for your product below.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-6">
            <ProductForm
            product={product}
            onFormSubmit={handleFormSubmit}
            onCancel={() => setOpen(false)}
            isEditMode={true}
            />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
