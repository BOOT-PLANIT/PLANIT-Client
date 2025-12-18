import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SIGNIN_PATH = "/signin";

function isStaticFile(pathname: string) {
  const staticExtensions =
    /\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|json|xml|txt)$/i;
  return staticExtensions.test(pathname);
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 정적 파일과 로그인 페이지는 통과
  if (isStaticFile(pathname) || pathname === SIGNIN_PATH) {
    return NextResponse.next();
  }

  // 쿠키에서 토큰 존재 여부 확인
  const token = req.cookies.get("planit_session")?.value;

  if (!token) {
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    const url = req.nextUrl.clone();
    url.pathname = SIGNIN_PATH;
    return NextResponse.redirect(url);
  }

  // / 페이지 /dashboard로 리다이렉트
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음 경로를 제외한 모든 요청 경로에 매칭
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     * - 정적 파일 확장자 (jpg, jpeg, png, gif, svg, ico, css, js, woff, woff2, ttf, eot, json, xml, txt)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|json|xml|txt)$).*)",
  ],
};
