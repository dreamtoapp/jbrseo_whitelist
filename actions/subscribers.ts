"use server";

import { prisma } from "@/helpers/prisma";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().trim().max(120).nullable().optional(),
  email: z.string().trim().email(),
  phone: z.string().trim().max(50).nullable().optional(),
  siteType: z.string().trim().max(50).nullable().optional(),
  siteUrl: z.string().trim().url().nullable().optional().or(z.literal("").transform(() => null)),
  verified: z.boolean(),
});

export type UpdateSubscriberInput = z.infer<typeof updateSchema>;

export async function updateSubscriber(id: string, input: UpdateSubscriberInput) {
  try {
    const data = updateSchema.parse(input);

    // If email changes, ensure uniqueness
    const existing = await prisma.subscriber.findFirst({
      where: { email: data.email, NOT: { id } },
      select: { id: true },
    });
    if (existing) return { success: false, error: "email_taken" } as const;

    await prisma.subscriber.update({
      where: { id },
      data: {
        name: data.name ?? null,
        email: data.email,
        phone: data.phone ?? null,
        siteType: data.siteType ?? null,
        siteUrl: data.siteUrl ?? null,
        verified: data.verified,
      },
    });

    return { success: true } as const;
  } catch (error) {
    console.error("updateSubscriber failed", error);
    return { success: false, error: "server" } as const;
  }
}

export async function softDeleteSubscriber(id: string) {
  try {
    // Deprecated: kept for backward compatibility
    await prisma.subscriber.delete({ where: { id } });
    return { success: true } as const;
  } catch (error) {
    console.error("softDeleteSubscriber failed", error);
    return { success: false, error: "server" } as const;
  }
}

export async function deleteSubscriber(id: string) {
  try {
    await prisma.subscriber.delete({ where: { id } });
    return { success: true } as const;
  } catch (error) {
    console.error("deleteSubscriber failed", error);
    return { success: false, error: "server" } as const;
  }
}


