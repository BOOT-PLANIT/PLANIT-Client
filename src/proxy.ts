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

  // 정적 파일 통과
  if (isStaticFile(pathname)) return NextResponse.next();

  // 로그인 페이지 통과
  if (pathname === SIGNIN_PATH) {
    return NextResponse.next();
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
