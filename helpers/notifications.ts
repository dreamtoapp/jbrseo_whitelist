export function showSuccessNotification(message: string) {
  if (typeof window !== "undefined") {
    console.info(message);
  }
}

export function showErrorNotification(message: string) {
  if (typeof window !== "undefined") {
    console.error(message);
  }
}

export function showInfoNotification(message: string) {
  if (typeof window !== "undefined") {
    console.info(message);
  }
}

