import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}
//ブログの全記事取得用API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ msg: "success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

//ブログ投稿ようAPI
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.create({ data: { title, description } });
    return NextResponse.json({ msg: "success", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ msg: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
