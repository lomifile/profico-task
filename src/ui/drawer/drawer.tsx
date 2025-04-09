"use client";
import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { X } from "lucide-react";

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogPrimitive.DialogContentProps
>(({ children, ...props }, forwardedRef) => (
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
));

export const Dialog = DialogPrimitive.Root;
export const DialogTitle = DialogPrimitive.DialogTitle;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  DialogPrimitive.DialogCloseProps
>(({ children, ...props }, ref) => (
  <DialogPrimitive.Close ref={ref} {...props}>
    <X />
  </DialogPrimitive.Close>
));
