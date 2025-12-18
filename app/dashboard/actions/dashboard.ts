"use server";

import { auth } from "@/auth";
import { prisma } from "@/helpers/prisma";

export type SubscriberData = {
  id: string;
  name: string;
  email: string;
  mobile: string | null;
  brandName: string;
  country: string | null;
  city: string | null;
  verified?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("unauthorized");
  }
  return session;
}

export async function getSubscribers(): Promise<SubscriberData[]> {
  try {
    await requireAdmin();
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
    return subscribers;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
}

export async function getSubscribersCount(): Promise<number> {
  try {
    await requireAdmin();
    return await prisma.subscriber.count();
  } catch (error) {
    console.error("Error counting subscribers:", error);
    return 0;
  }
}

export async function getRecentSubscribers(count: number = 5): Promise<SubscriberData[]> {
  try {
    await requireAdmin();
    const subscribers = await prisma.subscriber.findMany({
      take: count,
      orderBy: { createdAt: "desc" },
    });
    return subscribers;
  } catch (error) {
    console.error("Error fetching recent subscribers:", error);
    return [];
  }
}


