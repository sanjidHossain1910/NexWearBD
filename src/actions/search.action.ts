"use server"

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";


export async function saveSearchHistory(search: string) {

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return;

  const userId = session.user.id;

  await connectToDatabase();
  const query = search.trim().toLowerCase();
  await User.findByIdAndUpdate(userId, {
    $pull: {
      searchHistory: query,
    },
  });

  await User.findByIdAndUpdate(userId, {
    $push: {
      searchHistory: {
        $each: [query],
        $position: 0,
        $slice: 10,
      },
    },
  });
}
