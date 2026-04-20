export const colors = {
  brand: {
    primary: "#6115CD", // active tab bg, CTA
    primaryText: "#FFFFFF", // text on primary bg
    like: "#FF2B75", // active like chip bg
  },
  neutral: {
    white: "#FFFFFF",
    border: "#E8ECEF",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#57626F",
    inactive: "#8C8C8C", // TODO: уточнить из Figma (inactive tab label)
    onLight: "#111416", // TODO: подтвердить из Figma (author name, dark text on light bg)
  },
  background: {
    screen: "#F8F9FB",
    surface: "#fff",
    surfaceSoft: "#EFF2F7", // PostActionChip bg
  },
} as const;
