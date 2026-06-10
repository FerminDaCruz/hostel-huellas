type Props = {
  className?: string;
  rotate?: number;
  mirror?: boolean;
  variant?: "filled" | "outline";
  title?: string;
};

export function Footprint({
  className,
  rotate = 0,
  mirror = false,
  variant = "filled",
  title,
}: Props) {
  const fill = variant === "filled" ? "currentColor" : "none";
  const stroke = variant === "outline" ? "currentColor" : "none";
  const strokeWidth = variant === "outline" ? 2 : 0;

  return (
    <svg
      viewBox="0 0 180 320"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `${mirror ? "scaleX(-1)" : ""}rotate(${rotate}deg)` }}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}

      {/* Planta */}
      <path
        d="
  M88 242

  C72 242 60 236 54 224
  C48 212 48 198 56 184

  C64 170 66 154 58 138

  C46 114 44 92 54 72

  C66 48 88 38 112 42

  C136 46 154 62 160 86

  C166 108 160 126 146 142

  C134 156 128 172 130 188

  C132 204 126 220 114 232

  C106 238 98 242 88 242
  Z
  "
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transform="translate(68 36) translate(-68 -26)"
      />

      {/* Dedo gordo */}
      <path
        d="
          M42 36
          C42 22 53 10 68 10
          C82 10 92 22 92 36
          C92 50 82 62 68 62
          C53 62 42 50 42 36
          Z
        "
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transform="translate(68 36) scale(0.8) translate(-68 -48)"
      />

      {/* Segundo dedo */}
      <path
        d="
          M87 19
          C87 7 97 -1 108 -1
          C119 -1 127 9 127 20
          C127 33 119 43 108 43
          C97 43 87 31 87 19
          Z
        "
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transform="translate(108 20) scale(0.8) translate(-108 -20)"
      />

      {/* Tercer dedo */}
      <path
        d="
          M124 25
          C124 15 132 9 142 9
          C152 9 160 17 160 28
          C160 39 152 47 142 47
          C132 47 124 38 124 25
          Z
        "
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transform="translate(142 28) scale(0.8) translate(-142 -28)"
      />

      {/* Cuarto dedo */}
      <path
        d="
          M152 45
          C152 37 158 32 166 32
          C174 32 180 38 180 48
          C180 58 174 64 166 64
          C158 64 152 56 152 45
          Z
        "
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transform="translate(166 48) scale(0.8) translate(-166 -48)"
      />

      {/* Meñique */}
      <path
        d="
          M163 74
          C163 68 168 63 174 63
          C180 63 185 68 185 76
          C185 84 180 89 174 89
          C168 89 163 82 163 74
          Z
        "
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transform="translate(174 76) scale(0.8) translate(-174 -76)"
      />
    </svg>
  );
}
