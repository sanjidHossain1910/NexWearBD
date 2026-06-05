import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getUserSearchHistory } from "@/services/user.service";


export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ products: [] }, { status: 401 });
  return NextResponse.json({search: await getUserSearchHistory(session.user.id) });
}
