"use server";

import { auth } from "@/auth";
import { prisma } from "@/helpers/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("unauthorized");
  }
  return session;
}

export type AppSettingsData = {
  gtmId?: string | null;
  hotjarSiteId?: string | null;
  hotjarVersion?: number | null;
  twitterPixelId?: string | null;
};

export async function getAppSettings(): Promise<AppSettingsData | null> {
  await requireAdmin();

  const settings = await prisma.appSettings.findUnique({
    where: { key: "global" },
  });

  if (!settings) {
    return null;
  }

  return {
    gtmId: settings.gtmId ?? null,
    hotjarSiteId: settings.hotjarSiteId ?? null,
    hotjarVersion: settings.hotjarVersion ?? null,
    twitterPixelId: settings.twitterPixelId ?? null,
  };
}

export async function saveAppSettings(data: AppSettingsData): Promise<{ success: true } | { success: false; message: string }> {
  await requireAdmin();

  try {
    await prisma.appSettings.upsert({
      where: { key: "global" },
      update: {
        gtmId: data.gtmId?.trim() || null,
        hotjarSiteId: data.hotjarSiteId?.trim() || null,
        hotjarVersion: data.hotjarVersion ?? null,
        twitterPixelId: data.twitterPixelId?.trim() || null,
      },
      create: {
        key: "global",
        gtmId: data.gtmId?.trim() || null,
        hotjarSiteId: data.hotjarSiteId?.trim() || null,
        hotjarVersion: data.hotjarVersion ?? null,
        twitterPixelId: data.twitterPixelId?.trim() || null,
      },
    });

    return { success: true };
  } catch {
    return { success: false, message: "تعذّر حفظ إعدادات التطبيق. حاول لاحقًا." };
  }
}








