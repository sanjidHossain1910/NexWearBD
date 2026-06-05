"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

export default function Warning() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const noticeSeen = localStorage.getItem(
      "development-notice-seen"
    );

    if (!noticeSeen) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(
      "development-notice-seen",
      "true"
    );

    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            ⚠️ Website Under Development
          </DialogTitle>

          <DialogDescription>
            NexWearBD is currently under development.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm">
          Please do not place any orders or make payments at this time.
        </p>

        <Button onClick={handleClose}>
          I Understand
        </Button>
      </DialogContent>
    </Dialog>
  );
}