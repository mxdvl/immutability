import { qr } from "headless-qr";

/** Pure HTML grid QR code component */
export function QR({
  input,
  correction,
  size,
  colour = "currentColor",
}: Readonly<{
  input: string;
  correction: NonNullable<Parameters<typeof qr>[1]>["correction"];
  size: number;
  colour?: string;
}>) {
  const positions = qr(input, { correction }).flatMap((row, x) =>
    row.flatMap((module, y) => (module ? [{ x, y }] : [])),
  );

  return (
    <div
      style={{
        display: "grid",
        width: size,
        height: size,
        gridAutoColumns: "1fr",
        gridAutoRows: "1fr",
      }}
    >
      {positions.map(({ x, y }) => (
        <div
          style={{
            gridColumnStart: x + 1,
            gridRowStart: y + 1,
            background: colour,
          }}
        />
      ))}
    </div>
  );
}
