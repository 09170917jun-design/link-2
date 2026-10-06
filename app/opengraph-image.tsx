import { ImageResponse } from "next/og";

export const alt = "Link - 북마크 서비스";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 기본 폰트에는 한글이 없어서 이미지 안의 글자는 영문으로 구성한다.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e8a85",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 160, fontWeight: 800, letterSpacing: -4 }}>
          LINK
        </div>
        <div style={{ fontSize: 44, marginTop: 16 }}>
          Save and organize your favorite links
        </div>
        <div
          style={{
            width: 120,
            height: 12,
            borderRadius: 6,
            background: "#ffd600",
            marginTop: 40,
          }}
        />
      </div>
    ),
    size,
  );
}
