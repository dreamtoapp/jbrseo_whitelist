"use server";

import { prisma } from "@/helpers/prisma";

export type SubscriberData = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  siteType: string | null;
  siteUrl: string | null;
  country: string | null;
  city: string | null;
  verified?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function getSubscribers(): Promise<SubscriberData[]> {
  try {
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
    return await prisma.subscriber.count();
  } catch (error) {
    console.error("Error counting subscribers:", error);
    return 0;
  }
}

export async function getRecentSubscribers(count: number = 5): Promise<SubscriberData[]> {
  try {
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


