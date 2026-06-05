import bcrypt from "bcryptjs";
import { categories } from "@/constants";
import { connectToDatabase } from "@/lib/db";
import { Category } from "@/models/Category";
import { User } from "@/models/User";
import { slugify } from "@/lib/utils";
import dotenv from "dotenv";

dotenv.config();


async function seed() {
  await connectToDatabase();
  await Category.insertMany(categories.map((name) => ({ name, slug: slugify(name), description: `${name} crafted by Nexwear.` })));
  await User.findOneAndUpdate(
    { email: "admin@nexwear.com" },
    { name: "Nexwear Admin", email: "admin@nexwear.com", password: await bcrypt.hash("admin123", 12), role: "admin" },
    { upsert: true }
  );
  console.log("Seeded Nexwear data. Admin: admin@nexwear.com / admin123");
}

seed().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
