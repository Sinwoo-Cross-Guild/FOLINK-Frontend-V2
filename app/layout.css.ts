import { theme, flex } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "100vh",
  backgroundColor: theme.background,
  ...flex.FLEX,
});
