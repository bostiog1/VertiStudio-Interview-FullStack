import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const JWT_SECRET = process.env.JWT_SECRET || "";

if (!JWT_SECRET) {
  console.error("WARNING: JWT_SECRET is not set in environment variables!");
}

export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  return (
    cookieHeader
      ?.split(/;\s*/)
      .reverse()
      .find((c) => c.startsWith("token="))
      ?.split("=")[1] || null
  );
}

export function validateCookieToken(cookieHeader: string | null): {
  valid: boolean;
  decoded?: any;
  token?: string;
  error?: any;
} {
  const token = getTokenFromCookie(cookieHeader);
  if (!token) return { valid: false };

  if (!JWT_SECRET) {
    return { valid: false, error: "JWT_SECRET not configured" };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, decoded, token };
  } catch (error) {
    return { valid: false, error };
  }
}
