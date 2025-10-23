// src/components/atoms/Image.jsx
export default function Image({ src, alt, width = "100%", height = "auto", style }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height,
        objectFit: "cover",
        borderRadius: "10px",
        ...style,
      }}
    />
  );
}
