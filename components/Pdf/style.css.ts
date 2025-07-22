import { theme, font, flex } from "@/styles";
import { style } from "@vanilla-extract/css";

export const header = {
  introduce: style({
    padding: "0.3125rem 0.9375rem",
    backgroundColor: "rgba(196, 181, 255, 0.49)",
    borderRadius: "3.125rem",
    ...font.H6,
  }),

  highlight: style({
    background: theme.gradient,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block",
  }),
};

export const figure = {
  wrap: style({
    width: "100%",
    ...flex.COLUMN_CENTER,
    gap: "0.625rem",
  }),
  title: style({
    ...font.H4,
  }),
};

export const pdf = {
  container: style({
    width: "49rem",
    height: "25rem",
    border: "none",
    borderRadius: "1.3rem",
    boxShadow: `0.125rem 0.125rem 0.5rem ${theme.shadow}`,
    margin: "1.875rem 0",
    ...flex.CENTER,
    gap: "2.5rem",
    transition: "all 0.1s ease",
  }),
  dragging: style({
    backgroundColor: "#EEEAFF",
    border: `2px dashed ${theme.purple}`,
  }),
  body: style({
    width: "100%",
    ...flex.COLUMN_CENTER,
    gap: "1.65rem",
  }),
  btn: style({
    width: "17rem",
    padding: "0.9375rem 0",
    borderRadius: "0.5rem",
    border: "none",
    ...font.btnBold,
    color: theme.white,
    background: theme.gradient,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    selectors: {
      "&:hover": {
        transform: "scale(1.02)",
        boxShadow: `0 0.25rem 0.5rem ${theme.shadow}`,
      },
      "&:active": {
        transform: "scale(0.98)",
      },
    },
  }),
};