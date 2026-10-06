import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Validates the token and triggers the cookie refresh above.
  const { data } = await supabase.auth.getClaims();
  const isLoggedIn = !!data?.claims;

  const { pathname } = request.nextUrl;
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password";

  // 로그인하지 않은 사용자는 인덱스(/)와 인증 페이지 외에는 접근할 수 없다.
  // 로그인한 사용자가 인증 페이지에 오면 인덱스로 보낸다.
  const isPublic =
    isAuthPage ||
    pathname === "/" ||
    pathname.startsWith("/auth/") ||
    pathname.startsWith("/opengraph-image");
  const redirectTo = !isLoggedIn && !isPublic ? "/login" : isLoggedIn && isAuthPage ? "/" : null;
  if (redirectTo) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTo;
    const redirect = NextResponse.redirect(url);
    // 갱신된 세션 쿠키를 리디렉션 응답에도 전달한다.
    supabaseResponse.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  return supabaseResponse;
};
