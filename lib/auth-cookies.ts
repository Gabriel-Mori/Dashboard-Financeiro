"use server";

import {cookies} from "next/headers";

export async function setUserCookie(user: {email: string}) {
  (await cookies()).set({
    name: "user",
    value: JSON.stringify(user),
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getUserCookie() {
  const userCookie = (await cookies()).get("user");
  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie.value);
  } catch (error) {
    return null;
  }
}

export async function removeUserCookie() {
  (await cookies()).delete("user");
}
