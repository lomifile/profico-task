"use client";
import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { X } from "lucide-react";

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogPrimitive.DialogContentProps
>(function DialogContent({ children, ...props }, forwardedRef) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay />
      <DialogPrimitive.Content
        ref={forwardedRef}
        aria-describedby={undefined}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export const Dialog = DialogPrimitive.Root;
export const DialogTitle = DialogPrimitive.DialogTitle;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  DialogPrimitive.DialogCloseProps
>(function DialogClose({ ...props }, ref) {
  return (
    <DialogPrimitive.Close ref={ref} {...props}>
      <X />
    </DialogPrimitive.Close>
  );
});
