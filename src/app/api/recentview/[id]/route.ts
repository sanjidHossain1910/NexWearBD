import { connectToDatabase } from "@/lib/db";
import RecentView from "@/models/RecentView";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    console.log("user ID",userId)
    if (!userId) {
      return Response.json([]);
    }

    await connectToDatabase();

    const data = await RecentView.findOne({ user: userId })
      .populate("products")
      .lean() as any;

    return Response.json(data?.products ?? []);
  } catch (error) {
    console.error(error);

    return Response.json([]);
  }
}