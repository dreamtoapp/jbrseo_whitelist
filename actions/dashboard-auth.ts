"use server";

import { redirect } from "next/navigation";
import { verifyPassword, setAuthCookie } from "@/helpers/auth";

export async function login(formData: FormData) {
  const password = formData.get("password")?.toString() || "";

  if (await verifyPassword(password)) {
    await setAuthCookie();
    redirect("/dashboard");
  } else {
    redirect("/dashboard?error=invalid");
  }
}

export async function logout() {
  const { removeAuthCookie } = await import("@/helpers/auth");
  await removeAuthCookie();
  redirect("/dashboard");
}




