// src/components/atoms/Text.jsx
export default function Text({ children, size = "regular", muted = false, style }) {
  const fontSize = size === "small" ? "0.9rem" : "1rem";
  const color = muted ? "#B0BEC5" : "#5D4037";
  return <p style={{ fontSize, color, ...style }}>{children}</p>;
}
