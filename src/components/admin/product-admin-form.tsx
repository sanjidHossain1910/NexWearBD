"use client";

import { useMemo, useState, useTransition } from "react";
import { ImagePlus, Pencil, Plus, Save, Trash2, Upload } from "lucide-react";
import { createCategoryAction } from "@/actions/category.actions";
import { upsertProductAction } from "@/actions/product.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";

type CategoryOption = {
  name: string;
  slug: string;
};

async function fileToDataUri(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
export type ProductImage = {
  url: string;
  publicId: string;
};

export type ProductSize = {
  size: string;
  stock: number;
};

export type ProductVariant = {
  colorName: string;
  colorCode: string;
  images: ProductImage[];
  sizes: ProductSize[];
};

export function ProductAdminForm({ categories }: { categories: CategoryOption[] }) {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [categoryOptions, setCategoryOptions] = useState(categories);
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]?.name ?? "");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [tags, setTags] = useState("")
  const [code, setCode] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [sizes, setSizes] = useState<ProductSize[]>([
    {
      size: "",
      stock: 0,
    },
  ]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [colorName, setColorName] = useState("");
  const cleanImages = useMemo(
    () =>
      images.filter(
        (image) =>
          image.url.trim() &&
          image.publicId.trim()
      ),
    [images]
  );





  function addSize() {
    setSizes((current) => [
      ...current,
      {
        size: "",
        stock: 0,
      },
    ]);
  }

  function removeSize(index: number) {
    setSizes((current) =>
      current.filter((_, i) => i !== index)
    );
  }





  function updateName(value: string) {
    setName(value);
    setSlug(slugify(value));
  }


  async function uploadImages(files: FileList | null) {
    if (!files?.length) return;

    setLoading(true);
    setMessage("Preparing upload...");

    const uploadPromise = (async () => {
      const uploaded: ProductImage[] = [];

      for (const file of Array.from(files)) {
        const dataUri = await fileToDataUri(file);

        const response = await fetch("/api/uploads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dataUri,
            folder: "nexwear/products",
          }),
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();

        uploaded.push({
          url: result.url,
          publicId: result.publicId,
        });
      }

      setImages((current) => [...current, ...uploaded]);

      return uploaded;
    })();

    await toast.promise(uploadPromise, {
      loading: "Uploading images...",
      success: (data) => `${data.length} image(s) uploaded successfully`,
      error: "Image upload failed",
    });

    setMessage("Upload completed");
    setLoading(false);
  }


  async function handleDeleteImage(index: number) {
    const image = images[index];
    if (!image) return;

    await toast.promise(
      fetch("/api/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: image.publicId }),
      }).then(async (res) => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json();
      }),
      {
        loading: "Deleting image...",
        success: "Image deleted successfully",
        error: "Failed to delete image",
      }
    );

    setImages((prev) => prev.filter((_, i) => i !== index));
  }



  function addVariant() {
    const validSizes = sizes.filter(
      (size) => size.size.trim()
    );

    if (!colorName.trim()) {
      return alert("Color name required");
    }

    if (!images.length) {
      return alert("At least one image required");
    }

    if (!validSizes.length) {
      return alert("At least one size required");
    }

    setVariants((current) => [
      ...current,
      {
        colorName,
        colorCode: code,
        images,
        sizes: validSizes,
      },
    ]);

    // Reset form
    setColorName("");
    setCode("#000000");
    setImages([]);
    setSizes([
      {
        size: "",
        stock: 0,
      },
    ]);
  }


  function submitProduct() {
    setMessage("");

    const payload = {
      name,
      slug,
      description,

      category,
      subcategory: subcategory || undefined,

      brand: brand || "Nexwear",

      variants,

      price: Number(price),
      discountPrice: discountPrice
        ? Number(discountPrice)
        : undefined,

      featured,
      bestSeller,

      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    startTransition(async () => {
      try {
        await upsertProductAction(payload);

        setMessage("Product saved successfully.");
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Could not save product."
        );
      }
    });
  }



  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    try {
      await uploadImages(files);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload failed");
    } finally {
      event.target.value = "";
    }
  };

  function submitCategory() {
    if (!newCategory.trim()) return;
    startTransition(async () => {
      try {
        const saved = await createCategoryAction({ name: newCategory, description: newCategoryDescription });
        setCategoryOptions((items) => [...items.filter((item) => item.slug !== saved.slug), { name: saved.name, slug: saved.slug }].sort((a, b) => a.name.localeCompare(b.name)));
        setCategory(saved.name);
        setNewCategory("");
        setNewCategoryDescription("");
        setMessage("Category added and selected.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Could not add category.");
      }
    });
  }

  return (
    <div className="grid w-full justify-center gap-6 rounded-lg border p-5">
      <div>
        <h2 className="text-xl font-semibold">Add Product</h2>
        <p className="mt-1 text-sm text-muted-foreground">Create products with all sizes, colors, custom variants, categories, and 10+ images.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div><Label>Name</Label><Input value={name} onChange={(event) => updateName(event.target.value)} placeholder="Urban Oversized Tee" /></div>
        <div><Label>Slug</Label><Input value={slug} onChange={(event) => setSlug(event.target.value)} /></div>
        <div><Label>Price</Label><Input type="number" value={price} onChange={(event) => setPrice(event.target.value)} /></div>
        <div><Label>Discount Price</Label><Input type="number" value={discountPrice} onChange={(event) => setDiscountPrice(event.target.value)} /></div>
        <div>
          <Label>Category</Label>
          <select className="mt-1 h-10 w-full rounded-md dark:bg-gray-900 dark:text-white border bg-background px-3 text-sm" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categoryOptions.map((item) => <option key={item.slug} value={item.name}>{item.name}</option>)}
          </select>
        </div>
        <div><Label>Subcategory</Label><Input value={subcategory} onChange={(event) => setSubcategory(event.target.value)} /></div>
      </div>

      <div>
        <Label>
          Description
        </Label>
        <Textarea value={description} className="dark:bg-gray-900" onChange={(event) => setDescription(event.target.value)} placeholder="Product fabric, fit, styling, and care details." />

      </div>
      <div>
        <Label>Brand</Label>
        <Input value={brand} onChange={(event) => setBrand(event.target.value)} placeholder="Brand name " />
      </div>
      <div className="grid gap-3 rounded-lg border p-4">
        <h3 className="font-semibold">Add Category</h3>
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <Input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="New category name" />
          <Input value={newCategoryDescription} onChange={(event) => setNewCategoryDescription(event.target.value)} placeholder="Description" />
          <Button type="button" onClick={submitCategory} disabled={isPending}><Plus className="h-4 w-4" /> Add</Button>
        </div>
      </div>


      <div className="space-y-3 ">
        {variants.map((variant, index) => (
          <div
            key={index}
            className="rounded-lg flex flex-col gap-4 border p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className="size-5 rounded-full border"
                style={{
                  backgroundColor: variant.colorCode,
                }}
              />

              <h4 className="font-medium">
                {variant.colorName}
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {variant.images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image.url}
                    alt={`${name}-${index}`}
                    width={100}
                    height={100}
                    className="aspect-square object-cover"
                  />
                </div>
              ))}
            </div>

            <p>
              {variant.sizes.map((size, index) => (
                <span key={index}>
                  {size.size}: {size.stock}
                  <br />
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-3  rounded-lg border p-4">
        <h3 className="font-semibold">Add size, color, image, and stock.</h3>
        <div className="flex flex-col gap-4 ">
          <div>
            <h3 className="font-semibold">Color</h3>
            <div className="flex flex-col gap-3">
              <label htmlFor="">
                <p className="text-sm">Color Name</p>
                <Input type="text" value={colorName} onChange={(e) => setColorName(e.target.value)} placeholder="Color Name" />
              </label>
              <label style={{ backgroundColor: code }} className={`flex aspect-square size-20 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors`}>
                <Pencil className="text-muted-foreground" />
                <Input
                  type="color"
                  multiple
                  className="hidden"
                  onChange={(e) => { setCode(e.target.value) }}
                />
              </label>
            </div>
          </div>
          <div>
            {/* Image */}
            <div className="grid gap-3">
              <div>
                <h3 className="font-semibold">Images</h3>
                <p className="text-sm text-muted-foreground">
                  Upload product images
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg border"
                  >
                    <Image
                      src={image.url}
                      alt={`${name}-${index}`}
                      width={300}
                      height={300}
                      className="aspect-square w-full object-cover"
                    />

                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() =>
                        handleDeleteImage(index)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <label className="flex hover:bg-muted dark:hover:bg-gray-900 dark:text-white aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors">
                  <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Add Image
                  </span>

                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    disabled={loading}
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Sizes & Stock</h3>

              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={addSize}
              >
                + Add Size
              </Button>
            </div>

            <div className="space-y-3">
              {sizes.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <Input
                    placeholder="Size (M, L, XL)"
                    value={item.size}
                    onChange={(e) =>
                      setSizes((current) =>
                        current.map((size, i) =>
                          i === index
                            ? {
                              ...size,
                              size: e.target.value,
                            }
                            : size
                        )
                      )
                    }
                  />

                  <Input
                    type="number"
                    placeholder="Stock"
                    value={item.stock}
                    onChange={(e) =>
                      setSizes((current) =>
                        current.map((size, i) =>
                          i === index
                            ? {
                              ...size,
                              stock: Number(e.target.value),
                            }
                            : size
                        )
                      )
                    }
                  />

                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => removeSize(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => addVariant()}>Save</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div><Label>Tags</Label><Input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="tee, summer, cotton" /></div>
        <label className="flex items-center gap-2 rounded-lg border p-3 text-sm"><input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} /> Featured</label>
        <label className="flex items-center gap-2 rounded-lg border p-3 text-sm"><input type="checkbox" checked={bestSeller} onChange={(event) => setBestSeller(event.target.checked)} /> Best Seller</label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">Total stock: {10} · Images: {cleanImages.length}</p>
        <Button type="button" onClick={submitProduct} disabled={isPending}><Save className="h-4 w-4" /> Save Product</Button>
      </div>
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
