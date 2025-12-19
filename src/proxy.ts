import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SIGNIN_PATH = "/signin";
const ROOT_PATH = "/";
const DASHBOARD_PATH = "/dashboard";
const SESSION_COOKIE_NAME = (() => {
  const name = process.env.SESSION_COOKIE_NAME;
  if (!name) {
    throw new Error("SESSION_COOKIE_NAME environment variable is required");
  }
  return name;
})();

function isStaticFile(pathname: string) {
  const staticExtensions =
    /\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|json|xml|txt)$/i;
  return staticExtensions.test(pathname);
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isStaticFile(pathname)) return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  // [중요] 현재 경로를 헤더에 담기 위한 설정
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  // /signin 페이지는 통과 (이때도 위에서 설정한 헤더는 포함되어야 함)
  if (pathname === SIGNIN_PATH) {
    return NextResponse.next({
      request: {
        headers: requestHeaders, // 헤더 전달
      },
    });
  }

  // 토큰이 아예 없으면 로그인으로 이동
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = SIGNIN_PATH;
    return NextResponse.redirect(url);
  }

  // root 페이지 /dashboard로 이동
  if (pathname === ROOT_PATH) {
    const url = req.nextUrl.clone();
    url.pathname = DASHBOARD_PATH;
    return NextResponse.redirect(url);
  }

  // 일반적인 경우에도 헤더를 전달하며 통과
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
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
