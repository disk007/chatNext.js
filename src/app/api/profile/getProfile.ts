
import { cookies } from "next/headers";

export async function getProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Profile fetch error:", error);
    return null;
  }
}