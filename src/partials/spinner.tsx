export default function Spinner(props: { width: string; height: string }) {
  return (
    <span
      style={{
        width: `${props.width}px`,
        height: `${props.height}px`,
        border: "5px solid rgb(145 229 255)",
        borderBottomColor: "transparent",
        borderRadius: "50%",
        display: "inline-block",
        boxSizing: "border-box",
        animation: "rotation 1s linear infinite",
      }}
    ></span>
  );
}
