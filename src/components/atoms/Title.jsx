// src/components/atoms/Title.jsx
export default function Title({ children, level = 1, style }) {
  const Tag = `h${level}`;
  return <Tag style={{ ...style }}>{children}</Tag>;
}
