import { createHash, timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "./env.ts";

export interface AdminClaims {
  sub: string;
  role: "admin";
}

/** Constant-time string comparison (hashing first equalises lengths). */
function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function verifyCredentials(email: string, password: string) {
  const emailOk = safeEqual(email.trim().toLowerCase(), env.ADMIN_EMAIL.toLowerCase());
  const passOk = safeEqual(password, env.ADMIN_PASSWORD);
  return emailOk && passOk;
}

export function signToken(email: string) {
  const claims: AdminClaims = { sub: email, role: "admin" };
  return jwt.sign(claims, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Authentication required" });

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AdminClaims;
    if (payload.role !== "admin") throw new Error("Invalid role");
    res.locals.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
