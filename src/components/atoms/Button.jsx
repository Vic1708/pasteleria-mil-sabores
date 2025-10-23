// src/components/atoms/Button.jsx
export default function Button({ children, variant = "primary", onClick, type = "button" }) {
  const base = "btn";
  const classes = `${base} ${variant ? `btn-${variant}` : ""}`;

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
