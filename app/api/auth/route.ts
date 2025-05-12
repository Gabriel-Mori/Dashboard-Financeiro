import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("user");

  if (!userCookie) {
    return NextResponse.json(null, {status: 401});
  }

  try {
    const user = JSON.parse(userCookie.value);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(null, {status: 401});
  }
}
