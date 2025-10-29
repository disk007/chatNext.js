// src/lib/toast.ts
"use client";

import { toast } from "sonner";

export const showToast = (status: ToastStatusEnum, text: string) => {
  switch (status) {
    case ToastStatusEnum.SUCCESS:
      toast.success(text);
      break;
    case ToastStatusEnum.ERROR:
      toast.error(text);
      break;
    case ToastStatusEnum.INFO:
      toast.info(text);
      break;
    case ToastStatusEnum.WARNING:
      toast.warning(text);
      break;
  }
};

export enum ToastStatusEnum {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}
