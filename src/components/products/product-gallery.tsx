"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(images[0]);
  return (
    <div className="grid gap-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <Image src={active} alt={name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.map((image) => (
          <button key={image} onClick={() => setActive(image)} className="relative aspect-square overflow-hidden rounded-md border bg-muted">
            <Image src={image} alt={name} fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
