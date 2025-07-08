import { theme, font, flex, screen } from "@/styles";
import { style } from "@vanilla-extract/css";

export const page = {
  body: style({
    width: "100%",
    ...flex.CENTER,
  }),
  box: style({
    height: "100%",
    ...flex.COLUMN_CENTER,
  }),
};

export const title = {
  body: style({
    position: "relative",
    padding: "1.25rem 4.375rem",
    border: "none",
    ...font.H4,
  }),
  highlight: style({
    background: `${theme.gradient}`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block",
  }),
};