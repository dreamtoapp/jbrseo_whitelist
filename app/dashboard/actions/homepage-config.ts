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

export type HomePageConfigData = {
  heroTitlePrimary: string;
  heroTitleSecondary: string;
  heroDescription: string;
  bullets: string[];
  heroImageUrl?: string | null;
  heroImageAlt?: string | null;
  joinTitle: string;
  joinDescription: string;
  privacyText: string;
  badgeText: string;
  footerCopyright: string;
  footerJoinLinkText: string;
  footerContactEmail: string;
  footerContactText: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  whatsappCommunityUrl?: string | null;
  telegramChannelUrl?: string | null;
};

export async function getHomePageConfig(): Promise<HomePageConfigData | null> {
  await requireAdmin();

  const config = await prisma.homePageConfig.findUnique({
    where: { key: "default" },
  });

  if (!config) {
    return null;
  }

  return {
    heroTitlePrimary: config.heroTitlePrimary,
    heroTitleSecondary: config.heroTitleSecondary,
    heroDescription: config.heroDescription,
    bullets: config.bullets,
    heroImageUrl: config.heroImageUrl ?? null,
    heroImageAlt: config.heroImageAlt ?? null,
    joinTitle: config.joinTitle,
    joinDescription: config.joinDescription,
    privacyText: config.privacyText,
    badgeText: config.badgeText,
    footerCopyright: config.footerCopyright,
    footerJoinLinkText: config.footerJoinLinkText,
    footerContactEmail: config.footerContactEmail,
    footerContactText: config.footerContactText,
    facebookUrl: config.facebookUrl ?? null,
    instagramUrl: config.instagramUrl ?? null,
    linkedinUrl: config.linkedinUrl ?? null,
    twitterUrl: config.twitterUrl ?? null,
    whatsappCommunityUrl: config.whatsappCommunityUrl ?? null,
    telegramChannelUrl: config.telegramChannelUrl ?? null,
  };
}

export async function saveHomePageConfig(data: HomePageConfigData): Promise<{ success: true } | { success: false; message: string }> {
  await requireAdmin();

  const trimmedBullets = data.bullets.map((item) => item.trim()).filter((item) => item.length > 0);

  if (trimmedBullets.length === 0) {
    return { success: false, message: "يجب إضافة نقطة واحدة على الأقل في قائمة المميزات." };
  }

  try {
    await prisma.homePageConfig.upsert({
      where: { key: "default" },
      update: {
        heroTitlePrimary: data.heroTitlePrimary.trim(),
        heroTitleSecondary: data.heroTitleSecondary.trim(),
        heroDescription: data.heroDescription.trim(),
        bullets: trimmedBullets,
        heroImageUrl: data.heroImageUrl?.trim() || null,
        heroImageAlt: data.heroImageAlt?.trim() || null,
        joinTitle: data.joinTitle.trim(),
        joinDescription: data.joinDescription.trim(),
        privacyText: data.privacyText.trim(),
        badgeText: data.badgeText.trim(),
        footerCopyright: data.footerCopyright.trim(),
        footerJoinLinkText: data.footerJoinLinkText.trim(),
        footerContactEmail: data.footerContactEmail.trim(),
        footerContactText: data.footerContactText.trim(),
        facebookUrl: data.facebookUrl?.trim() || null,
        instagramUrl: data.instagramUrl?.trim() || null,
        linkedinUrl: data.linkedinUrl?.trim() || null,
        twitterUrl: data.twitterUrl?.trim() || null,
        whatsappCommunityUrl: data.whatsappCommunityUrl?.trim() || null,
        telegramChannelUrl: data.telegramChannelUrl?.trim() || null,
      },
      create: {
        key: "default",
        heroTitlePrimary: data.heroTitlePrimary.trim(),
        heroTitleSecondary: data.heroTitleSecondary.trim(),
        heroDescription: data.heroDescription.trim(),
        bullets: trimmedBullets,
        heroImageUrl: data.heroImageUrl?.trim() || null,
        heroImageAlt: data.heroImageAlt?.trim() || null,
        joinTitle: data.joinTitle.trim(),
        joinDescription: data.joinDescription.trim(),
        privacyText: data.privacyText.trim(),
        badgeText: data.badgeText.trim(),
        footerCopyright: data.footerCopyright.trim(),
        footerJoinLinkText: data.footerJoinLinkText.trim(),
        footerContactEmail: data.footerContactEmail.trim(),
        footerContactText: data.footerContactText.trim(),
        facebookUrl: data.facebookUrl?.trim() || null,
        instagramUrl: data.instagramUrl?.trim() || null,
        linkedinUrl: data.linkedinUrl?.trim() || null,
        twitterUrl: data.twitterUrl?.trim() || null,
        whatsappCommunityUrl: data.whatsappCommunityUrl?.trim() || null,
        telegramChannelUrl: data.telegramChannelUrl?.trim() || null,
      },
    });

    return { success: true };
  } catch {
    return { success: false, message: "تعذّر حفظ الإعدادات. حاول لاحقًا." };
  }
}

