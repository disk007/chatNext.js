// src/lib/toast.ts
"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastStatusEnum = exports.showToast = void 0;
const sonner_1 = require("sonner");
const showToast = (status, text) => {
    switch (status) {
        case ToastStatusEnum.SUCCESS:
            sonner_1.toast.success(text);
            break;
        case ToastStatusEnum.ERROR:
            sonner_1.toast.error(text);
            break;
        case ToastStatusEnum.INFO:
            sonner_1.toast.info(text);
            break;
        case ToastStatusEnum.WARNING:
            sonner_1.toast.warning(text);
            break;
    }
};
exports.showToast = showToast;
var ToastStatusEnum;
(function (ToastStatusEnum) {
    ToastStatusEnum["SUCCESS"] = "success";
    ToastStatusEnum["ERROR"] = "error";
    ToastStatusEnum["INFO"] = "info";
    ToastStatusEnum["WARNING"] = "warning";
})(ToastStatusEnum || (exports.ToastStatusEnum = ToastStatusEnum = {}));
