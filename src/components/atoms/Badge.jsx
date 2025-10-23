// src/components/atoms/Badge.jsx
export default function Badge({ children, color = "#fff0f4", textColor = "#7a2d47" }) {
  return (
    <span
      style={{
        backgroundColor: color,
        color: textColor,
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "0.8rem",
        fontWeight: "600",
      }}
    >
      {children}
    </span>
  );
}
