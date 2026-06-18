import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Early learning & childcare in St Lucia, Brisbane`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#11253F";
const SAND = "#F6F2EB";
const TERRA = "#D48B6A";
const SAGE = "#A8C29A";
const INK = "#444444";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: SAND,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top: emblem + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: NAVY,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 999,
                background: TERRA,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 600,
              color: NAVY,
              letterSpacing: -0.5,
            }}
          >
            The Munro Centre
          </div>
        </div>

        {/* middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 5,
              borderRadius: 999,
              background: TERRA,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.02,
              color: NAVY,
              letterSpacing: -2,
              maxWidth: 880,
            }}
          >
            Every Child Deserves To Belong
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: INK,
              maxWidth: 760,
            }}
          >
            Community-owned early learning &amp; childcare in St Lucia, Brisbane.
          </div>
        </div>

        {/* bottom: trust row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 26,
            color: NAVY,
          }}
        >
          <div style={{ display: "flex" }}>Not-for-profit · St Lucia</div>
          <div style={{ display: "flex", color: SAGE }}>•</div>
          <div style={{ display: "flex" }}>Caring since 1981</div>
          <div style={{ display: "flex", color: SAGE }}>•</div>
          <div style={{ display: "flex" }}>Kindy Approved</div>
        </div>
      </div>
    ),
    size,
  );
}
