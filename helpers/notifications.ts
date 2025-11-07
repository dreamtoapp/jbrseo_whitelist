import type { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";

type BaseConfig = SweetAlertOptions & { didOpen?: () => void };

export const notificationConfig: BaseConfig = {
  confirmButtonText: "حسناً",
  cancelButtonText: "إلغاء",
  buttonsStyling: false,
  customClass: {
    popup: "swal-dialog-rtl",
    confirmButton: "rounded-xl px-6 py-2 bg-foreground/20 hover:bg-foreground/30 text-foreground font-semibold shadow-lg",
    cancelButton: "rounded-xl px-6 py-2 bg-foreground/10 hover:bg-foreground/20 text-foreground font-semibold",
  },
  didOpen: () => {
    (async () => {
      if (!swalImport) return;
      try {
        const { default: Swal } = await swalImport;
        const popup = Swal.getPopup();
        if (popup) {
          popup.setAttribute("dir", "rtl");
        }
      } catch {
        // ignore errors during lazy load
      }
    })();
  },
};

type SwalModule = typeof import("sweetalert2");

let swalImport: Promise<SwalModule> | null = null;

async function fireAlert(config: SweetAlertOptions) {
  if (!swalImport) {
    swalImport = import("sweetalert2");
  }
  const Swal = (await swalImport).default;
  return Swal.fire(config);
}

function createAlert(icon: SweetAlertIcon, message: string) {
  return fireAlert({
    ...notificationConfig,
    icon,
    title: icon === "success" ? "نجح" : icon === "error" ? "خطأ" : "معلومة",
    text: message,
    showConfirmButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}

export function showSuccessNotification(message: string) {
  return createAlert("success", message);
}

export function showErrorNotification(message: string) {
  return createAlert("error", message);
}

export function showInfoNotification(message: string) {
  return createAlert("info", message);
}



