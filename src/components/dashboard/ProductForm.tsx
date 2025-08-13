
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/lib/data";
import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
});

type ProductFormData = z.infer<typeof formSchema>;

interface ProductFormProps {
  product?: Product;
  onFormSubmit: (data: ProductFormData, images: File[]) => void;
  onCancel: () => void;
  isEditMode?: boolean;
}

export function ProductForm({ product, onFormSubmit, onCancel, isEditMode = false }: ProductFormProps) {
  const [imagePreviews, setImagePreviews] = useState<string[]>(product?.images || []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      category: product?.category || "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const newFiles = [...imageFiles, ...files];
      setImageFiles(newFiles);
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };
  
  const removeImage = (indexToRemove: number) => {
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));

    // This logic is a bit more complex if we have a mix of old (URL string) and new (File object) images.
    // For this simplicity here, we'll just clear the new files if an old image is removed. 
    // A more robust solution would track new files and old URLs separately.
    const previewToRemove = imagePreviews[indexToRemove];
    if (previewToRemove.startsWith('blob:')) {
      const fileIndex = imageFiles.findIndex(file => URL.createObjectURL(file) === previewToRemove);
      if (fileIndex !== -1) {
        setImageFiles(files => files.filter((_, i) => i !== fileIndex));
      }
    } else {
      // In edit mode, if we remove an existing image, we need a way to signal this to the backend.
      // For this frontend-only implementation, we just update the preview state.
      // We will also filter out the corresponding url from the product.images on submit
    }
  };

  const onSubmit = (data: ProductFormData) => {
    onFormSubmit(data, imageFiles);
    form.reset();
    setImagePreviews([]);
    setImageFiles([]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormItem>
          <FormLabel>Product Images</FormLabel>
          <FormControl>
            <div 
              className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center cursor-pointer hover:border-primary"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                multiple 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleImageChange}
                accept="image/*"
              />
              <Upload className="mx-auto h-10 w-10 text-muted-foreground"/>
              <p className="mt-2 text-sm text-muted-foreground">Click or drag files to upload</p>
            </div>
          </FormControl>
          {imagePreviews.length > 0 && (
             <div className="mt-4 grid grid-cols-4 gap-4">
                {imagePreviews.map((src, index) => (
                    <div key={index} className="relative group">
                        <Image src={src} alt="Product preview" width={100} height={100} className="rounded-md object-cover w-full aspect-square"/>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100"
                          onClick={() => removeImage(index)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
             </div>
          )}
          <FormMessage />
        </FormItem>
         <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">{isEditMode ? "Save" : "Create Product"}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
