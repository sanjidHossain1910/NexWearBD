import { connectToDatabase } from "@/lib/db";
import RecentView from "@/models/RecentView";

interface Body {
  userId: string;
  productId: string;
}

export async function POST(req: Request) {

  try {
    const body: Body = await req.json();

    if (!body.userId || !body.productId) {
      return Response.json(
        { success: false, message: "Invalid data" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    await RecentView.updateOne(
      { user: body.userId },
      { $pull: { products: body.productId } }
    );

    await RecentView.updateOne(
      { user: body.userId },
      {
        $push: {
          products: {
            $each: [body.productId],
            $position: 0,
          },
        },
      },
      { upsert: true }
    );
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
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