import { cookies } from "next/headers";

const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || "admin";

export async function verifyPassword(password: string): Promise<boolean> {
  return password === DASHBOARD_PASSWORD;
}

export async function setAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set("dashboard-auth", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("dashboard-auth");
  return authCookie?.value === "authenticated";
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("dashboard-auth");
}





