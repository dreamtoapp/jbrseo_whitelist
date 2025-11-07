import Swal from "sweetalert2";

export const notificationConfig = {
  confirmButtonText: "حسناً",
  cancelButtonText: "إلغاء",
  buttonsStyling: false,
  customClass: {
    popup: "swal-dialog-rtl",
    confirmButton: "rounded-xl px-6 py-2 bg-foreground/20 hover:bg-foreground/30 text-foreground font-semibold shadow-lg",
    cancelButton: "rounded-xl px-6 py-2 bg-foreground/10 hover:bg-foreground/20 text-foreground font-semibold",
  },
  didOpen: () => {
    const popup = Swal.getPopup();
    if (popup) {
      popup.setAttribute("dir", "rtl");
    }
  },
};

export function showSuccessNotification(message: string) {
  return Swal.fire({
    ...notificationConfig,
    icon: "success",
    title: "نجح",
    text: message,
    showConfirmButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}

export function showErrorNotification(message: string) {
  return Swal.fire({
    ...notificationConfig,
    icon: "error",
    title: "خطأ",
    text: message,
    confirmButtonText: "حسناً",
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}

export function showInfoNotification(message: string) {
  return Swal.fire({
    ...notificationConfig,
    icon: "info",
    title: "معلومة",
    text: message,
    showConfirmButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}



