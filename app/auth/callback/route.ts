import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../utils/supabase/server";

// 이메일 링크의 code를 세션으로 교환한 뒤 next 경로로 보낸다.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  // 열린 리디렉션 방지: 같은 사이트의 경로만 허용
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";

  if (code) {
    const supabase = createClient(await cookies());
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${safeNext}`);
  }
  return NextResponse.redirect(`${origin}/forgot-password?error=expired`);
}
