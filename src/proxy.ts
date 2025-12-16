import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = new Set(["/signin"]);

function isStaticFile(pathname: string) {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

function isPublicPath(pathname: string) {
  if (PUBLIC_PATHS.has(pathname)) return true;

  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.json"
  )
    return true;

  return false;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("planit_session")?.value;

  // 정적 파일 통과
  if (isStaticFile(pathname)) return NextResponse.next();

  // 로그인 상태면 /dashboard로 이동
  if (pathname === "/signin" && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // public은 통과
  if (isPublicPath(pathname)) return NextResponse.next();

  // 나머지 보호
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
