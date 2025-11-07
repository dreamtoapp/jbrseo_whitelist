"use server";

import { prisma } from "@/helpers/prisma";
import { hmacHash, verifyHmac } from "@/helpers/tokens";
import { generateOtpCode, computeExpiryDate } from "@/helpers/otp";
import { sendOtpEmail } from "@/helpers/email";

export async function verifyOtpWithToken(token: string, code: string) {
  try {
    const tokenHash = hmacHash(token);
    const subscriber = await prisma.subscriber.findFirst({
      where: {
        verifyToken: tokenHash,
      },
    });

    if (!subscriber) {
      return { success: false, error: "not_found" } as const;
    }

    if (subscriber.verified) {
      return { success: true, alreadyVerified: true } as const;
    }

    if (!subscriber.otpCode || !subscriber.otpExpiresAt) {
      return { success: false, error: "otp_missing" } as const;
    }

    if (subscriber.otpExpiresAt < new Date()) {
      return { success: false, error: "otp_expired" } as const;
    }

    const ok = verifyHmac(code, subscriber.otpCode);
    if (!ok) {
      return { success: false, error: "otp_invalid" } as const;
    }

    await prisma.subscriber.update({
      where: { id: subscriber.id },
      data: {
        verified: true,
        verifiedAt: new Date(),
        otpCode: null,
        otpExpiresAt: null,
        verifyToken: null,
        verifyTokenExpiresAt: null,
      },
    });

    return { success: true } as const;
  } catch (error) {
    console.error("verifyOtpWithToken failed", error);
    return { success: false, error: "server" } as const;
  }
}

export async function resendOtp(token: string) {
  try {
    const tokenHash = hmacHash(token);
    const subscriber = await prisma.subscriber.findFirst({
      where: { verifyToken: tokenHash },
    });

    if (!subscriber) return { success: false, error: "not_found" } as const;

    const newCode = generateOtpCode();
    const newHash = hmacHash(newCode);
    const newExpiry = computeExpiryDate();

    await prisma.subscriber.update({
      where: { id: subscriber.id },
      data: { otpCode: newHash, otpExpiresAt: newExpiry },
    });

    // Reuse the same token link
    const link = `/verify?token=${encodeURIComponent(token)}`;
    await sendOtpEmail({ to: subscriber.email, code: newCode, link });

    return { success: true } as const;
  } catch (error) {
    console.error("resendOtp failed", error);
    return { success: false, error: "server" } as const;
  }
}


